const { Router } = require('express');
const mongoose = require('mongoose');
const ProfesorModelCreator = require('../models/profesorModel');
const routes = Router();
const urlDB = "mongodb://localhost:27017";

//------Endpoints------//

//------GET------//

routes.get("/", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const ProfesorModel = ProfesorModelCreator(connection);
        const test = await ProfesorModel.find();
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
        const ProfesorModel = ProfesorModelCreator(connection);
        const profesor = new ProfesorModel(req.body);
        const data = await profesor.save();
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message });
    }
});

module.exports = routes;