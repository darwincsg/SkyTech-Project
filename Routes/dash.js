const express = require("express");
const router = express.Router();


const verificarToken = require('../middleware/auth');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


router.use(cookieParser());

router.get("/", verificarToken,function(req, res){
    res.render("dashboard", {page: 'dashboard.ejs'});
});


module.exports = router;