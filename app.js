require('dotenv').config(); // use env file to

const express = require("express");

const app = express();
const connectDB = require("./server/db");

// read JSON from frontend
app.use(express.json());


// API routes
app.use("/api", require("./server/routes/taskRoutes"));


// serve frontend
app.use(express.static("public"));


app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/views/index.html");
});

connectDB();
app.listen(5000, ()=>{
    console.log("Server running on 5000");
});