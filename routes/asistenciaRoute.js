const { Router } = require('express');
const mongoose = require('mongoose');
const AsistenciaModelCreator = require('../models/asistenciaModel');
const EstudianteModelCreator = require('../models/estudianteModel');
const GrupoModelCreator = require('../models/grupoModel');
const MateriaModelCreator = require('../models/materiaModel');
const routes = Router();
const urlDB = "mongodb://localhost:27017";

//------Endpoints------//

    //------GETS ALL ATTENDANCE------//
    routes.get("/", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const test = await AsistenciaModel.find();
            res.json(test);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({ error: error.message });
        }
    });
    //------GETS BY ID------//
    routes.get("/:id", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.findById(req.params.id);
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({ error: error.message });
        }
    });
    //------GETS ALL ATTENDANCE BY STUDENT------//
    routes.get("/student/:studentID", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const EstudianteModel = EstudianteModelCreator(connection);
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.find({ "student": req.params.studentID}).populate("student");
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({ error: error.message });
        }
    });
    //------GETS ALL ATTENDANCE BY SUBJECT------//
    routes.get("/subject/:studentID", async (req,res) => {
        const connection = await mongoose.createConnection();
        try {
            const MateriasModel = MateriaModelCreator(connection);
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.find({ "subject": req.params.studentID}).populate("subject");
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({ error: error.message });
        }
    });
    //------GETS ALL ATTENDANCE BY GROUP------//
    routes.get("/group/:groupID", async (req,res) => {
        const connection = await mongoose.createConnection();
        try {
            const GrupoModel = GrupoModelCreator(connection);
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.find({ "group": req.params.groupID}).populate("group");
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({ error: error.message });
        }
    });
    //------POSTS NEW ATTENDANCE------//
    routes.post("/", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const asistencia = new AsistenciaModel(req.body);
            const data = await asistencia.save();
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({ error: error.message });
        }
    });

    //------PUTS BY ID------//
    routes.put("/:id", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({ error: error.message });
        }
    });

    //------DELETES BY ID------//
    routes.delete("/:id", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.findByIdAndDelete(req.params.id);
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({ error: error.message });
        }
    });

module.exports = routes;