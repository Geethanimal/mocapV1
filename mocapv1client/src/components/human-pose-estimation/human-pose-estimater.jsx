import React, { useEffect, useRef } from 'react';

import { Pose } from "@mediapipe/pose";
import * as pose from "@mediapipe/pose";
import * as cam from '@mediapipe/camera_utils'
import Webcam from 'react-webcam'

function ComponentHPE() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const landmarkgridRef = useRef(null);
    // const LandmarkGrid = window.LandmarkGrid;
    // const grid = new LandmarkGrid(landmarkgridRef);
    const connect = window.drawConnectors;
    const drawLandmarks = window.drawLandmarks;
    var camera = null;

    function onResults(results) {
        console.log(results);

        // const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Set canvas width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext("2d");
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(results.segmentationMask, 0, 0,
            canvasElement.width, canvasElement.height);

        if (results.poseLandmarks) {
            // Only overwrite existing pixels.
            canvasCtx.globalCompositeOperation = 'source-in';
            canvasCtx.fillStyle = '#00FF00';
            canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

            // Only overwrite missing pixels.
            canvasCtx.globalCompositeOperation = 'destination-atop';
            canvasCtx.drawImage(
                results.image, 0, 0, canvasElement.width, canvasElement.height);

            canvasCtx.globalCompositeOperation = 'source-over';
            connect(canvasCtx, results.poseLandmarks, pose.POSE_CONNECTIONS,
                { color: '#00FF00', lineWidth: 4 });
            drawLandmarks(canvasCtx, results.poseLandmarks,
                { color: '#FF0000', lineWidth: 2 });
            canvasCtx.restore();
            // grid.updateLandmarks(results.poseWorldLandmarks);
        }
    }

    // setInterval(())
    useEffect(() => {
        const humanpose = new Pose({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
            },
        });

        humanpose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: true,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        humanpose.onResults(onResults);

        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null
        ) {
            camera = new cam.Camera(webcamRef.current.video, {
                onFrame: async () => {
                    await humanpose.send({ image: webcamRef.current.video });
                },
                width: 640,
                height: 480,
            });
            camera.start();
        }

    }, []);

    return (
        <>
            <center>
                <div className="container">
                    <Webcam
                        
                        ref={webcamRef}
                        style={{
                            position: "absolute",
                            marginLeft: "auto",
                            marginRight: "auto",
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            zindex: 9,
                            width: 640,
                            height: 480,
                        }}
                    />{" "}
                    <canvas
                        ref={canvasRef}
                        className="output_canvas"
                        style={{
                            position: "absolute",
                            marginLeft: "auto",
                            marginRight: "auto",
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            zindex: 9,
                            width: 640,
                            height: 480,
                        }}
                    ></canvas>
                </div>
            </center>
            <div ref={landmarkgridRef} class="landmark-grid-container"></div>
        </>


    );

}

export default ComponentHPE;