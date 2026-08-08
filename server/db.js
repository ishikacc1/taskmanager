

const mongoose = require("mongoose");
async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO_URI:", process.env.MONGO_URI);
        console.log("connect");
    }catch(error){
        console.log("error");
    }
}
module.exports = connectDB;