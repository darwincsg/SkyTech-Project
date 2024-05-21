const express = require("express");
const router = express.Router();


const verificarToken = require('../middleware/auth');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


router.use(cookieParser());

router.get("/", verificarToken,function(req, res){
    res.render("dashboard", {page: 'dashboard.ejs'});
});

router.get("/overview", function(req,res){
    res.render("overview", {page: 'overview.ejs'});
});


router.get("/gestao", function(req,res){
    res.render("gestao", {page: 'gestao.ejs'});
});

router.get("/montagems", function(req,res){
    res.render("montagems", {page: 'montagems.ejs'});
});

router.get("/estadisticas", function(req,res){
    res.render("estadisticas", {page: 'estadisticas.ejs'});
});

module.exports = router;