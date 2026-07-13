import { useState, useEffect } from 'react';
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

type RunningMode = "IMAGE" | "VIDEO" | undefined;
type Delegate = "GPU" | "CPU" | undefined;

const WASM_BASE_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm";
const FACE_MODEL_URL = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

export const useFaceLandmarker = (runningMode: RunningMode="VIDEO", delegate: Delegate="GPU") => {
    const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(null);

    useEffect(() => {
        let cancelled = false;
        const initalize = async () => {
            const vision = await FilesetResolver.forVisionTasks(WASM_BASE_URL);
            const created = await FaceLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: FACE_MODEL_URL,
                    delegate: delegate,
                
                },
                runningMode: runningMode,
                numFaces: 1,
                outputFaceBlendshapes: true
            });
            if (cancelled) {
                created.close();
                return;}
            setFaceLandmarker(created);
        };

        initalize();

        return () => {
            cancelled = true;
            setFaceLandmarker((current) => { 
                current?.close();
                return null;
            });
        }
    }, []);
    return faceLandmarker;
};