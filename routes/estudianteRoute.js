const { Router } = require('express');
const mongoose = require('mongoose');
const EstudianteModelCreator = require('../models/estudianteModel');
const routes = Router();
const urlDB = "mongodb://localhost:27017";

//------Endpoints------//

//------GET------//

routes.get("/", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const EstudianteModel = EstudianteModelCreator(connection);
        const test = await EstudianteModel.find();
        res.json(test);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message });
    }
});

routes.get("/:id", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const EstudianteModel = EstudianteModelCreator(connection);
        const data = await EstudianteModel.findById(req.params.id);
        res.json(data);
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
        const EstudianteModel = EstudianteModelCreator(connection);
        const estudiante = new EstudianteModel(req.body);
        const data = await estudiante.save();
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message });
    }
});

module.exports = routes;