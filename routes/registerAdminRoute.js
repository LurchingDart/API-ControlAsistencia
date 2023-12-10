const { Router } = require('express');
const routes = Router();

//------Endpoints------//

routes.get("/", (req, res) => {
    res.send("Register Admin");
});

module.exports = routes;