const { Router } = require('express');
const mongoose = require('mongoose');
const MateriaModelCreator = require('../models/materiaModel');
const routes = Router();
const urlDB = "mongodb://localhost:27017";

//------Endpoints------//

//------GET------//

routes.get("/", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const MateriaModel = MateriaModelCreator(connection);
        const data = await MateriaModel.find();
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
        const MateriaModel = MateriaModelCreator(connection);
        const materia = new MateriaModel(req.body);
        const data = await materia.save();
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message });
    }
});

module.exports = routes;