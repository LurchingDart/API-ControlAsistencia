const { Router } = require('express');
const routes = Router();

routes.get("/", (req, res) => {
    res.send("Login Admin");
});

module.exports = routes;