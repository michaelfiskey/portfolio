import { useState, useEffect } from 'react';
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

type RunningMode = "IMAGE" | "VIDEO" | undefined;
type Delegate = "GPU" | "CPU" | undefined;

const WASM_BASE_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm";
const HAND_MODEL_URL = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

export const useHandLandmarker = (runningMode: RunningMode="VIDEO", delegate: Delegate ="GPU") => {
    const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null);

    useEffect(() => {
        let cancelled = false;

        const initialize = async () => {
            const vision = await FilesetResolver.forVisionTasks(WASM_BASE_URL);
            const created = await HandLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: HAND_MODEL_URL,
                    delegate: delegate
                },
                runningMode: runningMode,
                numHands: 2
            });
            if (cancelled) {
                created.close();
                return;
            }
            setHandLandmarker(created);
        };

        initialize();

        return () => {
            cancelled = true;
            setHandLandmarker((current) => {
                current?.close();
                return null;
            });
        };
    }, []);

    return handLandmarker;
};