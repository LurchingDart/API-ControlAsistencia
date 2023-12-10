const { Router } = require('express');
const mongoose = require('mongoose');
const GrupoModelCreator = require('../models/grupoModel');
const routes = Router();
const urlDB = "mongodb://localhost:27017";

//------Endpoints------//

//------GET------//

routes.get("/", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const GrupoModel = GrupoModelCreator(connection);
        const test = await GrupoModel.find();
        res.json(test);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message });
    }
});

routes.post("/", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const GrupoModel = GrupoModelCreator(connection);
        const grupo = new GrupoModel(req.body);
        const data = await grupo.save();
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message });
    }
});

module.exports = routes;