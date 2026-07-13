import { useEffect, useMemo, useRef, useState } from "react";
import { useHandLandmarker } from "../../hooks/useHandLandmarker.ts";
import { useFaceLandmarker } from "../../hooks/useFaceLandmarker.ts";
import FileUpload from '../../components/FileUpload.tsx';
import PageContainer from "../../components/container/PageContainer";
import PageSection from "../../components/page-section/PageSection";
import Webcam from "react-webcam";
import { COLORS } from "../../constants/colors.ts";
import * as Tone from 'tone';

import { HandLandmarker, FaceLandmarker, DrawingUtils } from "@mediapipe/tasks-vision";

const SHARED_WIDTH = "w-150";

const JAW_OPEN_THRESHOLD = 0.4;
const MOUTH_SMILE_RIGHT = 0.6;
const MOUTH_SMILE_LEFT = MOUTH_SMILE_RIGHT;
const BROW_DOWN_RIGHT = 0.2
const BROW_DOWN_LEFT = BROW_DOWN_RIGHT;
const BROW_OUTER_UP_RIGHT = 0.7;
const BROW_OUTER_UP_LEFT = BROW_OUTER_UP_RIGHT;
const MIN_Y = 0
const MAX_Y = 1

const TOGGLE_COOLDOWN_MS = 1000

const MIN_SEMITONES = -12
const MAX_SEMITONES = 12
const PAN_LEFT = -1
const PAN_RIGHT = 1
const GAIN_MAKEUP_MULTIPLIER = 2

type Handedness = "Left" | "Right" | undefined;
type Landmark = { x: number; y: number; z: number };
type DetectedHand = {
    landmarks: Landmark[];
    handedness: Handedness;
};

const HandDj = () => {
    const [track, setTrack] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const playerRef = useRef<Tone.Player | null>(null);

    const pitchShiftRef = useRef<Tone.PitchShift | null>(null);
    const pannerRef = useRef<Tone.Panner | null>(null);
    const reverbRef = useRef<Tone.Reverb | null>(null);
    const reverbMakeupGainRef = useRef<Tone.Gain | null>(null);
    const echoRef = useRef<Tone.FeedbackDelay | null >(null);
    
    const lastPausePlayToggleRef = useRef<number>(0);

    const handLandmarker = useHandLandmarker();
    const faceLandmaker = useFaceLandmarker();
    
    const trackUrl = useMemo(() => track ? URL.createObjectURL(track) : null, [track]);

    const interpolate = (value: number, min1: number, max1: number, min2: number, max2: number) => {
        const normalized = (value - min1) / (max1 - min1);
        const clamped = Math.min(1, Math.max(0, normalized));
        const inverted = 1 - clamped;
        return min2 + inverted * (max2 - min2);
    };

    const detectLeftHandOnly = (
        leftHand: DetectedHand | undefined,
        rightHand: DetectedHand | undefined,
        leftPinkyY: number | undefined,
    ): boolean => {
        return !!leftHand && !rightHand && leftPinkyY !== undefined;
    };

    const detectRightHandOnly = (
        leftHand: DetectedHand | undefined,
        rightHand: DetectedHand | undefined,
        rightPinkyY: number | undefined,
    ): boolean => {
        return !leftHand && !!rightHand && rightPinkyY !== undefined;
    };

    // pause and play method 
    const pausePlay = async () => {
        if (!playerRef.current) return;

        await Tone.start();

        const transport = Tone.getTransport();

        if (transport.state === "started") { transport.pause(); }
        else { transport.start(); }
    };

    useEffect(() => {
        const panner = new Tone.Panner(0).toDestination();
        const pitchShift = new Tone.PitchShift({
            pitch: 0,
            wet: 0,
        });

        const reverbShift = new Tone.Reverb({
            decay: 2.5,
            preDelay: 0.01,
            wet: 0,
        });
        const reverbMakeupGain = new Tone.Gain(1);

        const echoShift = new Tone.FeedbackDelay("8n", 0);

        pitchShift.connect(reverbShift);
        reverbShift.connect(reverbMakeupGain);
        reverbMakeupGain.connect(panner);
        echoShift.connect(pitchShift);

        pannerRef.current = panner;
        pitchShiftRef.current = pitchShift;
        reverbRef.current = reverbShift;
        reverbMakeupGainRef.current = reverbMakeupGain;
        echoRef.current = echoShift;

        return () => {
            panner.dispose();
            pannerRef.current = null;
            pitchShift.dispose();
            pitchShiftRef.current = null;
            reverbShift.dispose();
            reverbRef.current = null;
            reverbMakeupGain.dispose();
            reverbMakeupGainRef.current = null;
            echoShift.dispose();
            echoRef.current = null;
        };
    }, []);

    // transport and player setup and sync
    useEffect(() => {
        if (!trackUrl) {
            Tone.getTransport().stop();
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
            return;
        }

        let isDisposed = false;

        const setupPlayer = async () => {
            const transport = Tone.getTransport();
            transport.stop();
            transport.seconds = 0;

            const nextPlayer = new Tone.Player({
                url: trackUrl,
                autostart: false,
                loop: true
            });

            if (echoRef.current) {
                nextPlayer.connect(echoRef.current);
            } else if (pitchShiftRef.current) {
                nextPlayer.connect(pitchShiftRef.current);
            } else {
                nextPlayer.toDestination();
            }

            // sync player and transport positions.
            nextPlayer.sync().start(0);

            if (isDisposed) {
                nextPlayer.dispose();
                return;
            }

            if (playerRef.current) {
                playerRef.current.dispose();
            }

            playerRef.current = nextPlayer;
        };

        setupPlayer();

        return () => {
            isDisposed = true;
            Tone.getTransport().stop();
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [trackUrl]);

    useEffect(() => {
        return () => {
            if (trackUrl) {
                URL.revokeObjectURL(trackUrl);
            }
        };
    }, [trackUrl]);


    useEffect(() => {
        if (!handLandmarker) return;
        if (!faceLandmaker) return;
        
        let rafId: number;

        const detectLoop = () => {
            const video = webcamRef.current?.video;
            const canvas = canvasRef.current;

            if (video && canvas && video.readyState === 4) {
                if (canvas.width !== video.videoWidth) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                }

                const ctx = canvas.getContext("2d");
                if (ctx) {
        
                    const faceResult = faceLandmaker.detectForVideo(video, performance.now());
                    const facialExpressions = Object.fromEntries(
                        (faceResult?.faceBlendshapes?.[0]?.categories ?? []).map(b => [b.categoryName, b.score])
                    );

                    const handResult = handLandmarker.detectForVideo(video, performance.now());
                    const hands: DetectedHand[] = handResult.landmarks.map((landmarks, handIndex) => ({
                        landmarks,
                        handedness: handResult.handedness[handIndex]?.[0]?.displayName as "Left" | "Right" | undefined,
                    }));
                    const leftHand = hands.find(hand => hand.handedness === "Left");
                    const rightHand = hands.find(hand => hand.handedness === "Right");
                    const leftPinkyY = leftHand?.landmarks[20].y;
                    const rightPinkyY = rightHand?.landmarks[20].y;

                    ctx.save();
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    
                    // draw landmarks and connectors
                    const drawingUtils = new DrawingUtils(ctx);
                    for (const landmarks of faceResult.faceLandmarks) {
                        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, {
                            color: COLORS.MINT[200],
                            lineWidth: 1
                        });
                    }

                    for (const landmarks of handResult.landmarks) {
                        drawingUtils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, {
                            color: COLORS.MINT[200],
                            lineWidth: 3
                        });
                        drawingUtils.drawLandmarks(landmarks, { color: COLORS.WARM[900], radius: 3 });
                    }
                    
                    // dj functions
                    if (track) {
                        if (faceResult.faceBlendshapes.length > 0) {

                            // jaw open - pause / play
                            if (facialExpressions.jawOpen > JAW_OPEN_THRESHOLD) {
                                const now = performance.now();
                                if (now - lastPausePlayToggleRef.current > TOGGLE_COOLDOWN_MS) {
                                    lastPausePlayToggleRef.current = now;
                                    pausePlay();
                                }
                            }

                            if (facialExpressions.mouthSmileRight > MOUTH_SMILE_RIGHT && facialExpressions.mouthSmileLeft > MOUTH_SMILE_LEFT) {
                                // smile and left hand - reverb
                                console.log('smiling!');
                                if (detectLeftHandOnly(leftHand, rightHand, leftPinkyY)) {
                                    const reverbWet = 1 - Math.min(1, Math.max(0, leftPinkyY!));
                                    if (reverbRef.current) {
                                        reverbRef.current.wet.value = reverbWet;
                                    }
                                    if (reverbMakeupGainRef.current) {
                                        reverbMakeupGainRef.current.gain.value = 1 + reverbWet * GAIN_MAKEUP_MULTIPLIER;
                                    }
                                }
                                // smile and right hand - echo
                                if (detectRightHandOnly(leftHand, rightHand, rightPinkyY)) {
                                    const feedback = (1 - Math.min(1, Math.max(0, rightPinkyY!))) * 0.5;

                                    if (echoRef.current) {
                                        echoRef.current.feedback.value = feedback;
                                    }
                                }
                            } else if (facialExpressions.browOuterUpLeft > BROW_OUTER_UP_LEFT && facialExpressions.browOuterUpRight > BROW_OUTER_UP_RIGHT) {
                                // brows up and left hand - filter
                                console.log('brows up!');

                                // brows up and right hand - autowah

                            } else if (facialExpressions.browDownLeft > BROW_DOWN_LEFT && facialExpressions.browDownRight > BROW_DOWN_RIGHT) {
                                // brows down and left hand (screen position) - pitch up and down
                                console.log("brows down!")

                                if (detectLeftHandOnly(leftHand, rightHand, leftPinkyY)) {
                                    const pitch = interpolate(leftPinkyY!, MIN_Y, MAX_Y, MIN_SEMITONES, MAX_SEMITONES);
                                    if (pitchShiftRef.current) {
                                        pitchShiftRef.current.wet.value = 1;
                                        pitchShiftRef.current.pitch = pitch;
                                    }
                                // brows down and right hand (screen position) - pan left and right
                                } else if (detectRightHandOnly(leftHand, rightHand, rightPinkyY)) {
                                    const pan = interpolate(rightPinkyY!, MIN_Y, MAX_Y, PAN_LEFT, PAN_RIGHT);
                                    if (pannerRef.current) {
                                        pannerRef.current.pan.value = pan;
                                    }
                                }
                            }
                        }
                    }
                    ctx.restore();
                }
            }

            rafId = requestAnimationFrame(detectLoop);
        };

        detectLoop();

        return () => {
            cancelAnimationFrame(rafId);
        };
    }, [handLandmarker, faceLandmaker, track]);

    return (
        <PageContainer>
            <PageSection id="hand-dj-about">
                <h1>Hand Dj</h1>
                <h2>A DJ program controlled with only your hands.</h2>
                <p>Finish this about section!</p>
            </PageSection>
            <PageSection id="hand-dj-camera">
                <div className="flex flex-col gap-5 items-center justify-center max-w-300 mx-auto">
                    <div className={`relative ${SHARED_WIDTH}`}>
                        <Webcam ref={webcamRef} mirrored={true} className="w-full" />
                        <canvas
                            ref={canvasRef}
                            className="absolute top-0 left-0 w-full h-full pointer-events-none"
                            style={{ transform: "scaleX(-1)" }}
                        />
                    </div>
                    <FileUpload acceptedFiles={{'audio/*':[]}}
                        className={`border-2 border-dotted border-warm-450 rounded-lg hover:cursor-pointer bg-warm-100 shadow-xl p-5 text-center ${SHARED_WIDTH}`}
                        onFileAccepted={(file) => {
                            setTrack(file);
                            setUploadError(null);
                        }}
                        onFileRejected={(message) => {
                            setUploadError(message);
                            setTrack(null);
                        }}
                    />
                    {track && !uploadError && <p>Loaded track: {track.name}</p>}
                    {uploadError && <p className="text-blush-400!">{uploadError}</p>}
                    {track && <div>
                        </div>}
                </div>
            </PageSection>
        </PageContainer>
    )
}
export default HandDj;
