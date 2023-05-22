const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// var firebase = require('firebase')
const admin = require('firebase-admin');

const serviceAccount = require('./mocapv1-15bb7-firebase-adminsdk-qdx3l-31dab9847d.json');

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

    socket.on("send_message", (data) => {

        if (data.message.visibility > 0.9) {

            console.log(data.message);
            const ref = admin.database().ref('/poseLandMarks/poseLandMarks/left_wrist/-NW1qisJRxVRCB0KwJlS'); // Replace with the path to your data in the Realtime Database
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
})



server.listen(3001, () => {
    console.log("SERVER IS RUNNING")
})