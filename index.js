const express = require("express");                  //Initializing express
const app = express();

const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');

//const { MongoClient } = require('mongodb'); //Initializing mongoose
const bodyParser = require("body-parser");            //Initializing body-parser

app.set("view engine", "ejs");
app.set("views", __dirname + "/Views");

var path = require('path');


app.use(cookieParser());

app.use(express.static( path.join(__dirname + "/Views/")));

//app.use(express.static( path.join(__dirname + "/Views/scripts")));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

const router = require("./Routes/index.js");
const register = require("./Routes/register.js");
const dashboard = require("./Routes/dash.js")

app.use("/", router);
app.use("/register",register);
app.use("/dashboard", dashboard);



mongoose.connect('mongodb://localhost:27017/SkyTech',
    { 
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

