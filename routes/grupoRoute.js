const { Router } = require('express');
const mongoose = require('mongoose');
const GrupoModelCreator = require('../models/grupoModel');
const ProfesorModelCreator = require('../models/profesorModel');
const routes = Router();
const urlDB = "mongodb://localhost:27017";

//------Endpoints------//

//------GETS ALL GROUPS------//
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

//------GETS GROUP BY ID------//
routes.get("/:id", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const GrupoModel = GrupoModelCreator(connection);
        const test = await GrupoModel.findById(req.params.id);
        res.json(test);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message });
    }
});

//------GETS ALL STUDENTS FROM A GROUP------//
routes.get("/:id/estudiantes", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const GrupoModel = GrupoModelCreator(connection);
        const test = await GrupoModel.findById(req.params.id).populate("students");
        res.json(test.estudiantes);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message });
    }
});
//------GETS ALL GROUPS FROM A TEACHER------//
routes.get("/teacher/:teacherID", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const ProfesorModel = ProfesorModelCreator(connection);
        const GrupoModel = GrupoModelCreator(connection);
        const data = await GrupoModel.find({ "teacher": req.params.teacherID}).populate("teacher");
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