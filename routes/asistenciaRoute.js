const { Router } = require('express');
const mongoose = require('mongoose');
const AsistenciaModelCreator = require('../models/asistenciaModel');
const EstudianteModelCreator = require('../models/estudianteModel');
const routes = Router();
const urlDB = "mongodb://localhost:27017";

//------Endpoints------//
/*
GET /attendance/student/:id: Gets all the attendance records of the student with the specified ID.
GET /attendance/subject/:id: Gets all the attendance records of the subject with the specified ID.
GET /attendance/group/:id: Gets all the attendance records of the group with the specified ID.
 */
    //------GETS------//
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
    })

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

module.exports = routes;