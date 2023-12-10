const { Router } = require('express');
const routes = Router();

//------Endpoints------//

//------GET------//
routes.get("/", (req, res) => {
    res.send("Register");
});

module.exports = routes;