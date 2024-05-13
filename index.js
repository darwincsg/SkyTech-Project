const express = require("express");                  //Initializing express
const app = express();
const mongoose = require("mongoose");
//const { MongoClient } = require('mongodb'); //Initializing mongoose
const bodyParser = require("body-parser");            //Initializing body-parser
//passport = require("passport");
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

var path = require('path');

app.use(express.static( path.join(__dirname + "/Views/styles")));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

const router = require("./Routes/index.js");

app.use("/", router);


app.set("view engine", "ejs");
app.set("views", __dirname + "/Views");

mongoose.connect('mongodb+srv://bentobruno88:XCyOHXUvuuSgNsax@test-db.hysl8hk.mongodb.net/?retryWrites=true&w=majority&appName=test-db',
    { 
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
//t

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

