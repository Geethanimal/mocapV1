const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// var firebase = require('firebase')
const admin = require('firebase-admin');

const serviceAccount = require('./mocapv1-15bb7-firebase-adminsdk-qdx3l-31dab9847d.json');
const { Socket } = require('dgram');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://mocapv1-15bb7-default-rtdb.firebaseio.com' // Replace with your Firebase project's database URL
});

app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("send_LeftWristLandMarks", (data) => {

        if (data.message.visibility > 0.9) {

            // console.log("left_wrist :" + data.message);
            const ref = admin.database().ref('/user123/poseLandMarks/left_wrist'); // Replace with the path to your data in the Realtime Database
            ref.update(data.message)
                .then(() => {
                    // res.status(201).json({ message: 'Data created successfully' });
                    console.log('Data created successfully');
                })
                .catch(error => {
                    console.error('Error creating data:', error);
                    // res.status(500).json({ error: 'Failed to create data' });
                });

        }

    })

    socket.on("send_LeftElbowLandMarks", (data) => {

        if (data.message.visibility > 0.9) {

            // console.log("left_elbow :" + data.message);
            // const ref = admin.database().ref('/user123/poseLandMarks/left_elbow'); // Replace with the path to your data in the Realtime Database
            // ref.update(data.message)
            //     .then(() => {
            //         // res.status(201).json({ message: 'Data created successfully' });
            //         console.log('Data created successfully');
            //     })
            //     .catch(error => {
            //         console.error('Error creating data:', error);
            //         // res.status(500).json({ error: 'Failed to create data' });
            //     });

        }

    })

    socket.on("send_LeftSholderLandMarks", (data) =>{

        if(data.message.visibility > 0.9){

            // console.log("left_sholder : "+ data.message);
            // const ref = admin.database().ref('/user123/poseLandMarks/left_sholder');
            // ref.update(data.message)
            //     .then(() => {
            //         // res.status(201).json({ message: 'Data created successfully' });
            //         console.log('Data created successfully');
            //     })
            //     .catch(error => {
            //         console.error('Error creating data:', error);
            //         // res.status(500).json({ error: 'Failed to create data' });
            //     });
        }
    })

    socket.on("send_LeftAnkleLandMarks", (data) =>{

        if(data.message.visibility > 0.9){

            // console.log("left_ankle : "+ data.message);
            // const ref = admin.database().ref('/user123/poseLandMarks/left_ankle');
            // ref.update(data.message)
            //     .then(() => {
            //         // res.status(201).json({ message: 'Data created successfully' });
            //         console.log('Data created successfully');
            //     })
            //     .catch(error => {
            //         console.error('Error creating data:', error);
            //         // res.status(500).json({ error: 'Failed to create data' });
            //     });
        }
    })

    socket.on("send_RightWristLandMarks", (data) =>{

        if(data.message.visibility > 0.9){

            // console.log("right_wrist : "+ data.message);
            const ref = admin.database().ref('/user123/poseLandMarks/right_wrist');
            ref.update(data.message)
                .then(() => {
                    // res.status(201).json({ message: 'Data created successfully' });
                    console.log('Data created successfully');
                })
                .catch(error => {
                    console.error('Error creating data:', error);
                    // res.status(500).json({ error: 'Failed to create data' });
                });
        }
    })

    socket.on("send_RightElbowLandMarks", (data) =>{

        if(data.message.visibility > 0.9){

            // console.log("right_elbow : "+ data.message);
            // const ref = admin.database().ref('/user123/poseLandMarks/right_elbow');
            // ref.update(data.message)
            //     .then(() => {
            //         // res.status(201).json({ message: 'Data created successfully' });
            //         console.log('Data created successfully');
            //     })
            //     .catch(error => {
            //         console.error('Error creating data:', error);
            //         // res.status(500).json({ error: 'Failed to create data' });
            //     });
        }
    })

    socket.on("send_RightSholderLandMarks", (data) =>{

        if(data.message.visibility > 0.9){

            // console.log("right_sholder : "+ data.message);
            // const ref = admin.database().ref('/user123/poseLandMarks/right_sholder');
            // ref.update(data.message)
            //     .then(() => {
            //         // res.status(201).json({ message: 'Data created successfully' });
            //         console.log('Data created successfully');
            //     })
            //     .catch(error => {
            //         console.error('Error creating data:', error);
            //         // res.status(500).json({ error: 'Failed to create data' });
            //     });
        }
    })
    
    socket.on("send_RightAnkleLandMarks", (data) =>{

        if(data.message.visibility > 0.9){

            // console.log("right_ankle : "+ data.message);
            // const ref = admin.database().ref('/user123/poseLandMarks/right_ankle');
            // ref.update(data.message)
            //     .then(() => {
            //         // res.status(201).json({ message: 'Data created successfully' });
            //         console.log('Data created successfully');
            //     })
            //     .catch(error => {
            //         console.error('Error creating data:', error);
            //         // res.status(500).json({ error: 'Failed to create data' });
            //     });
        }
    })

})



server.listen(3001, () => {
    console.log("SERVER IS RUNNING")
})