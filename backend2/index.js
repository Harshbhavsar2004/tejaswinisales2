const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const Razorpay = require("razorpay");

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));

mongoose.connect("mongodb+srv://hbhavsar847:Harshal2004@cluster0.wldqsom.mongodb.net/e-commerce");

//api

app.get("/", (req, res) => {

    res.send("hello world")
})




app.listen(port, (error) => {
    if (!error) {
        console.log("server is running on" + port)
    }
    else {
        console.log("Error" + error)
    }
})
