const { Router } = require('express');
const mongoose = require('mongoose');
const MateriaModelCreator = require('../models/materiaModel');
const routes = Router();
const urlDB = process.env.MONGODB_URL;

//------Endpoints------//
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

routes.get("/:id", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const MateriaModel = MateriaModelCreator(connection);
        const data = await MateriaModel.findById(req.params.id);
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

routes.put("/:id", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const MateriaModel = MateriaModelCreator(connection);
        const data = await MateriaModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message });
    }
});

routes.delete("/:id", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const MateriaModel = MateriaModelCreator(connection);
        const data = await MateriaModel.findByIdAndDelete(req.params.id);
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message })
    }
});

module.exports = routes;