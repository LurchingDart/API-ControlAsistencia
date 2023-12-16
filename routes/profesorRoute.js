const Router = require('express');
const mongoose = require('mongoose');
const ProfesorModelCreator = require('../models/profesorModel');
const MateriasModelCreator = require('../models/materiaModel');
const routes = Router();
const urlDB = "mongodb+srv://test:HGWJGI7tfgNtpxAm@asistencia.4nf2nve.mongodb.net/test";

//------Endpoints------//
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

routes.get("/:id", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const ProfesorModel = ProfesorModelCreator(connection);
        const test = await ProfesorModel.findById(req.params.id);
        res.json(test);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message });
    }
});

routes.get("/check/:email", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const ProfesorModel = ProfesorModelCreator(connection);
        const data = await ProfesorModel.findOne().where("email").equals(req.params.email);
        if (data) {
            res.json(true);
        } else {
            res.json(false);
        }
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message });
    }
});

routes.get("/email/:email", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const MateriasModel = MateriasModelCreator(connection);
        const ProfesorModel = ProfesorModelCreator(connection);
        const data = await ProfesorModel.findOne().where("email").equals(req.params.email).populate("subjects");
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

routes.put("/:id", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const ProfesorModel = ProfesorModelCreator(connection);
        const data = await ProfesorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
        const ProfesorModel = ProfesorModelCreator(connection);
        const data = await ProfesorModel.findByIdAndDelete(req.params.id);
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message });
    }
});

module.exports = routes;