const { Router } = require('express');
const mongoose = require('mongoose');
const EstudianteModelCreator = require('../models/estudianteModel');
const GrupoModelCreator = require('../models/grupoModel');
const ProfesorModelCreator = require('../models/profesorModel');
const MateriasModelCreator = require('../models/materiaModel');
const routes = Router();
const urlDB = process.env.MONGODB_URL;

//------Endpoints------//

//------GET ALL STUDENTS------//
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
//------GET STUDENT BY ID------//
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
//------CHECK IF STUDENT EXISTS------//
routes.get("/check/:studentId", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const EstudianteModel = EstudianteModelCreator(connection);
        const data = await EstudianteModel.findOne().where("studentId").equals(req.params.studentId);
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

//------GET STUDENT FROM STUDENT ID------//
routes.get("/studentId/:studentId", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const EstudianteModel = EstudianteModelCreator(connection);
        const data = await EstudianteModel.findOne().where("studentId").equals(req.params.studentId);
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message });
    }
});

//------GET ALL STUDENTS FROM A GROUP------//
routes.get("/grupo/:grupoID", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const GrupoModel = GrupoModelCreator(connection);
        const EstudianteModel = EstudianteModelCreator(connection);
        const data = await EstudianteModel.find({ "group": req.params.grupoID }).populate("group");
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message });
    }
});
//------GET ALL STUDENTS FROM A TEACHER------//
routes.get("/teacher/:teacherID", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const ProfesorModel = ProfesorModelCreator(connection);
        const MateriasModel = MateriasModelCreator(connection);
        const GrupoModel = GrupoModelCreator(connection);
        const EstudianteModel = EstudianteModelCreator(connection);
        const data = await EstudianteModel.find({ "teacher": req.params.teacherID }).populate("group").populate("subjects");
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message });
    }
});
//------CREATE ONE STUDENT------//
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
//------UPDATE ONE STUDENT------//
routes.put("/:id", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const EstudianteModel = EstudianteModelCreator(connection);
        const data = await EstudianteModel.findByIdAndUpdate(req.params.id, req.body);
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message });
    }
});
//------DELETE ONE STUDENT------//
routes.delete("/:id", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const EstudianteModel = EstudianteModelCreator(connection);
        const data = await EstudianteModel.findByIdAndDelete(req.params.id);
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message });
    }
});

module.exports = routes;