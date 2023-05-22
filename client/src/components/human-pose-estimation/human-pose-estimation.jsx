// importing dependencies
import React, { useEffect, useRef } from "react";

// importing 3rd party dependencies
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "@mediapipe/face_mesh/face_mesh";
import "@mediapipe/drawing_utils/drawing_utils";
import "@mediapipe/control_utils_3d";
import "@mediapipe/camera_utils";
import "@mediapipe/pose/pose";
import { Pose } from "@mediapipe/pose";
import * as pose from "@mediapipe/pose";
import * as cam from '@mediapipe/camera_utils'
import Webcam from 'react-webcam'
import io from "socket.io-client";


// importing styles
import './human-pose-estimation.css'

const socket = io.connect("http://localhost:3001");

// creating a function for HPE
const HPE = () => {

    

    const sendMessage = (poseLandmarks) => {
        socket.emit("send_message", {message:poseLandmarks})
    }

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const connect = window.drawConnectors;
    const drawLandmarks = window.drawLandmarks;
    var camera = null;

    // const landmarkgridRef = useRef(null);
    // const LandmarkGrid = window.LandmarkGrid;
    // const grid = new LandmarkGrid(landmarkgridRef);

    // const grid = new LandmarkGrid(landmarkgridRef, {
    //     connectionColor: 0xCCCCCC,
    //     definedColors:
    //         [{name: 'LEFT', value: 0xffa500}, {name: 'RIGHT', value: 0x00ffff}],
    //     range: 2,
    //     fitToGrid: true,
    //     labelSuffix: 'm',
    //     landmarkSize: 2,
    //     numCellsPerAxis: 4,
    //     showHidden: false,
    //     centered: true,
    //   });

    function onResults(results) {
        
        
        

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

        if (results.segmentationMask) {

            canvasCtx.drawImage(results.segmentationMask, 0, 0,
                canvasElement.width, canvasElement.height);

            canvasCtx.globalCompositeOperation = 'source-out';
            canvasCtx.fillStyle = '#0000FF7F';
            canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

            // Only overwrite missing pixels.
            canvasCtx.globalCompositeOperation = 'destination-atop';
            canvasCtx.drawImage(
                results.image, 0, 0, canvasElement.width, canvasElement.height);

            canvasCtx.globalCompositeOperation = 'source-over';
            connect(canvasCtx, results.poseLandmarks, pose.POSE_CONNECTIONS,
                { visibilityMin: 0.65, color: 'white', lineWidth: 5 });

        }

        if (results.poseLandmarks) {

            if(results.poseLandmarks[15].visibility >0.9){
                console.log(results.poseLandmarks[15]);
                sendMessage(results.poseLandmarks[15]);
            }

            


            drawLandmarks(
                canvasCtx,
                Object.values(pose.POSE_LANDMARKS_LEFT)
                    .map(index => results.poseLandmarks[index]),
                { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(255,138,0)' });

            drawLandmarks(
                canvasCtx,
                Object.values(pose.POSE_LANDMARKS_RIGHT)
                    .map(index => results.poseLandmarks[index]),
                { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(0,217,231)' });

            drawLandmarks(
                canvasCtx,
                Object.values(pose.POSE_LANDMARKS_NEUTRAL)
                    .map(index => results.poseLandmarks[index]),
                { visibilityMin: 0.65, color: 'white', fillColor: 'white' });


            // grid.updateLandmarks(results.poseWorldLandmarks);
        }

        canvasCtx.restore();

        if (results.poseWorldLandmarks) {
            // grid.updateLandmarks(results.poseWorldLandmarks, pose.POSE_CONNECTIONS, [
            //     { list: Object.values(pose.POSE_LANDMARKS_LEFT), color: 'LEFT' },
            //     { list: Object.values(pose.POSE_LANDMARKS_RIGHT), color: 'RIGHT' },
            // ]);

        } else {
            // grid.updateLandmarks([]);
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
                width: "100vw",
                height: "100vh",

            });
            camera.start();
        }

    }, []);


    return (
        <>
            <center>
                <div className="container-fluid">
                    <div className="row mt-5 pt-5" style={{ position: "absolute", zindex: 9, textAlign: "center", left: 0, right: 0, marginLeft: "auto", marginRight: "auto", }}>
                        <h1 className="mt-5 pt-5 text-center text-primary">MocapV1</h1>
                        <h2 className="mt-5 text-center text-primary" >Looking for a human   <div class="spinner-border text-primary"></div></h2>
                    </div>

                    <Webcam
                        className="img-fluid"
                        ref={webcamRef}
                        style={{
                            position: "absolute",
                            marginLeft: "auto",
                            marginRight: "auto",
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            zindex: 9,
                            width: "100%",
                            height: "100%",
                            display: "none",
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
                            width: "100%",
                            height: "100%",
                        }}
                    ></canvas>
                </div>
            </center>
            {/* <div className="squre_box">
                <div ref={landmarkgridRef} class="landmark-grid-container"></div>
            </div> */}

        </>
    );
}

export default HPE