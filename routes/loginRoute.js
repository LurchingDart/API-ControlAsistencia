const { Router } = require('express');
const routes = Router();

//------Endpoints------//

//------GET------//
routes.get("/", (req, res) => {
    res.send("Login");
});

module.exports = routes;