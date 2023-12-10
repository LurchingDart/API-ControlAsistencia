//------Imports------//
const express = require('express');
const {Router} = require('express');
const routes = Router();

//------Endpoints------//

routes.get("/", (req, res) => {
    res.send("Test correcto");
});

module.exports = routes;