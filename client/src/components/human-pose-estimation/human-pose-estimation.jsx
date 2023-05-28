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

    // Left wrist landmarks sending Socket.io function
    const sendLeftWristLandMarks = (poseLandmarks) => {
        socket.emit("send_LeftWristLandMarks", {message:poseLandmarks})
    }

    // Left Elbow landmarks sending Socket.io function
    const sendLeftElbowLandMarks = (poseLandmarks) => {
        socket.emit("send_LeftElbowLandMarks", {message:poseLandmarks})
    }

    // Left Elbow landmarks sending Socket.io function
    const sendLeftSholderLandMarks = (poseLandmarks) => {
        socket.emit("send_LeftSholderLandMarks", {message:poseLandmarks})
    }

    // Right Wrist landmarks sending Socket.io function
    const sendRightWristLandMarks = (poseLandmarks) => {
        socket.emit("send_RightWristLandMarks", {message:poseLandmarks})
    }

    // Right Elbow landmarks sending Socket.io function
    const sendRightElbowLandMarks = (poseLandmarks) => {
        socket.emit("send_RightElbowLandMarks", {message:poseLandmarks})
    }

    // Right Sholder landmarks sending Socket.io function
    const sendRightSholderLandMarks = (poseLandmarks) => {
        socket.emit("send_RightSholderLandMarks", {message:poseLandmarks})
    }

    // Right Ankle landmarks sending Socket.io function
    const sendRightAnkleLandMarks = (poseLandmarks) => {
        socket.emit("send_RightAnkleLandMarks", {message:poseLandmarks})
    }

    // Left Ankle landmarks sending Socket.io function
    const sendLeftAnkleLandMarks = (poseLandmarks) => {
        socket.emit("send_LeftAnkleLandMarks", {message:poseLandmarks})
    }

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const connect = window.drawConnectors;
    const drawLandmarks = window.drawLandmarks;
    var camera = null;

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

        if (results.poseWorldLandmarks && results.poseLandmarks) {

            console.log(results.poseWorldLandmarks[15]);
            
            // Left wrist landmarks sending
            if(results.poseWorldLandmarks[15].visibility >0.9){
                // console.log(results.poseLandmarks[15]);
                sendLeftWristLandMarks(results.poseWorldLandmarks[15]);
            }

            // Left elbow landmarks sending
            if(results.poseWorldLandmarks[13].visibility >0.9){
                // console.log(results.poseLandmarks[13]);
                sendLeftElbowLandMarks(results.poseWorldLandmarks[13]);
            }

            // Left shoulder landmarks sending
            if(results.poseWorldLandmarks[11].visibility >0.9){
                // console.log(results.poseLandmarks[11]);
                sendLeftSholderLandMarks(results.poseWorldLandmarks[11]);
            }

            // Left ankle landmarks sending
            if(results.poseWorldLandmarks[27].visibility >0.9){
                // console.log(results.poseLandmarks[27]);
                sendLeftAnkleLandMarks(results.poseWorldLandmarks[27]);   
            }

            // Right wrist landmarks sending
            if(results.poseWorldLandmarks[16].visibility >0.9){
                sendRightWristLandMarks(results.poseWorldLandmarks[16]);
            }

            // Right elbow landmarks sending
            if(results.poseWorldLandmarks[14].visibility >0.9){
                sendRightElbowLandMarks(results.poseWorldLandmarks[14]);
            }

            // Right shoulder landmarks sending
            if(results.poseWorldLandmarks[12].visibility >0.9){
                sendRightSholderLandMarks(results.poseWorldLandmarks[12]);
            }

            // Right ankle landmarks sending
            if(results.poseWorldLandmarks[28].visibility >0.9){
                sendRightAnkleLandMarks(results.poseWorldLandmarks[28]);
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

        }

        // if(results.poseLandmarks){
        //     // Left wrist landmarks sending
        //     if(results.poseLandmarks[15].visibility >0.9){
        //         // console.log(results.poseLandmarks[15]);
        //         sendLeftWristLandMarks(results.poseLandmarks[15]);
        //     }

        //     // Left elbow landmarks sending
        //     if(results.poseLandmarks[13].visibility >0.9){
        //         // console.log(results.poseLandmarks[13]);
        //         sendLeftElbowLandMarks(results.poseLandmarks[13]);
        //     }

        //     // Left shoulder landmarks sending
        //     if(results.poseLandmarks[11].visibility >0.9){
        //         // console.log(results.poseLandmarks[11]);
        //         sendLeftSholderLandMarks(results.poseLandmarks[11]);
        //     }

        //     // Left ankle landmarks sending
        //     if(results.poseLandmarks[27].visibility >0.9){
        //         // console.log(results.poseLandmarks[27]);
        //         sendLeftAnkleLandMarks(results.poseLandmarks[27]);   
        //     }

        //     // Right wrist landmarks sending
        //     if(results.poseLandmarks[16].visibility >0.9){
        //         sendRightWristLandMarks(results.poseLandmarks[16]);
        //     }

        //     // Right elbow landmarks sending
        //     if(results.poseLandmarks[14].visibility >0.9){
        //         sendRightElbowLandMarks(results.poseLandmarks[14]);
        //     }

        //     // Right shoulder landmarks sending
        //     if(results.poseLandmarks[12].visibility >0.9){
        //         sendRightSholderLandMarks(results.poseLandmarks[12]);
        //     }

        //     // Right ankle landmarks sending
        //     if(results.poseLandmarks[28].visibility >0.9){
        //         sendRightAnkleLandMarks(results.poseLandmarks[28]);
        //     }
        // }

        canvasCtx.restore();
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