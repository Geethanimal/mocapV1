const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");


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
        console.log(data);
        try{
            dataPLMPush(data);
            console.log("data inserted");
        }catch(e){
            console.log("Error : " + e.message);
        }
        
    })
})



server.listen(3001, () => {
    console.log("SERVER IS RUNNING")
})