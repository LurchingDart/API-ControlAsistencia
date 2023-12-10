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
    //------GETS ALL ATTENDANCE BY DATE AND STUDENT------//
    routes.get("/student/:studentID/date/:year/:month/:day", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const studentID = req.params.studentID;
            const year = parseInt(req.params.year);
            const month = parseInt(req.params.month);
            const day = parseInt(req.params.day);
            const EstudianteModel = EstudianteModelCreator(connection);
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.find({
                "student": studentID,
                'dateData.year': year,
                'dateData.month': month,
                'dateData.day': day,
            }).populate("student");
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({ error: error.message });
        }
    });
    //------GETS ALL ATTENDANCE BY STUDENT AND GROUP------//
    routes.get("/student/:studentID/group/:groupID", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const EstudianteModel = EstudianteModelCreator(connection);
            const GrupoModel = GrupoModelCreator(connection);
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.find({
                "student": req.params.studentID,
                "group": req.params.groupID
            }).populate("student").populate("group");
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({error: error.message});
        }
    });
    //------GETS ALL ATTENDANCE BY STUDENT AND SUBJECT------//
    routes.get("/student/:studentID/subject/:subjectID", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const EstudianteModel = EstudianteModelCreator(connection);
            const MateriaModel = MateriaModelCreator(connection);
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.find({
                "student": req.params.studentID,
                "subject": req.params.subjectID
            }).populate("student").populate("subject");
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({error: error.message});
        }
    });
    //------GETS ALL ATTENDANCE BY STUDENT, GROUP AND SUBJECT------//
    routes.get("/student/:studentID/group/:groupID/subject/:subjectID", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const EstudianteModel = EstudianteModelCreator(connection);
            const GrupoModel = GrupoModelCreator(connection);
            const MateriaModel = MateriaModelCreator(connection);
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.find({
                "student": req.params.studentID,
                "group": req.params.groupID,
                "subject": req.params.subjectID
            }).populate("student").populate("group").populate("subject");
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({error: error.message});
        }
    });
    //------GETS ALL ATTENDANCE BY GROUP------//
    routes.get("/group/:groupID", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const GrupoModel = GrupoModelCreator(connection);
            const EstudianteModel = EstudianteModelCreator(connection);
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.find({ "group": req.params.groupID}).populate("group").populate("student");
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({ error: error.message });
        }
    });
    //------GETS ALL ATTENDANCE BY DATE AND GROUP------//
    routes.get("/group/:groupID/date/:year/:month/:day", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const groupID = req.params.groupID;
            const year = parseInt(req.params.year);
            const month = parseInt(req.params.month);
            const day = parseInt(req.params.day);
            const GrupoModel = GrupoModelCreator(connection);
            const EstudianteModel = EstudianteModelCreator(connection);
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.find({
                "group": groupID,
                'dateData.year': year,
                'dateData.month': month,
                'dateData.day': day,
            }).populate("group").populate("student");
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({ error: error.message });
        }
    })
    //------GETS ALL ATTENDANCE BY GROUP AND SUBJECT------//
    routes.get("/group/:groupID/subject/:subjectID", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const GrupoModel = GrupoModelCreator(connection);
            const MateriaModel = MateriaModelCreator(connection);
            const EstudianteModel = EstudianteModelCreator(connection);
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.find({
                "group": req.params.groupID,
                "subject": req.params.subjectID
            }).populate("group").populate("subject").populate("student");
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({error: error.message});
        }
    });
    //------GETS ALL ATTENDANCE BY DATE, GROUP AND SUBJECT------//
    routes.get("/group/:groupID/subject/:subjectID/date/:year/:month/:day", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const groupID = req.params.groupID;
            const subjectID = req.params.subjectID;
            const year = parseInt(req.params.year);
            const month = parseInt(req.params.month);
            const day = parseInt(req.params.day);
            const GrupoModel = GrupoModelCreator(connection);
            const MateriaModel = MateriaModelCreator(connection);
            const EstudianteModel = EstudianteModelCreator(connection);
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.find({
                "group": groupID,
                "subject": subjectID,
                'dateData.year': year,
                'dateData.month': month,
                'dateData.day': day,
            }).populate("group").populate("subject").populate("student");
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({error: error.message});
        }
    });
    //------GETS ALL ATTENDANCE BY SUBJECT------//
    routes.get("/subject/:subjectID", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const MateriaModel = MateriaModelCreator(connection);
            const EstudianteModel = EstudianteModelCreator(connection);
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.find({ "subject": req.params.subjectID}).populate("subject").populate("student");
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({ error: error.message });
        }
    });
    //------GETS ALL ATTENDANCE BY DATE AND SUBJECT------//
    routes.get("/subject/:subjectID/date/:year/:month/:day", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const subjectID = req.params.subjectID;
            const year = parseInt(req.params.year);
            const month = parseInt(req.params.month);
            const day = parseInt(req.params.day);
            const MateriaModel = MateriaModelCreator(connection);
            const EstudianteModel = EstudianteModelCreator(connection);
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.find({
                "subject": subjectID,
                'dateData.year': year,
                'dateData.month': month,
                'dateData.day': day,
            }).populate("subject").populate("student");
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({ error: error.message });
        }
    })
    //------GETS ALL ATTENDANCE BY GROUP, SUBJECT, STUDENT AND DATE------//
    routes.get("/subject/:subjectID/group/:groupID/student/:studentID/date/:year/:month/:day", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const subjectID = req.params.subjectID;
            const groupID = req.params.groupID;
            const studentID = req.params.studentID;
            const year = parseInt(req.params.year);
            const month = parseInt(req.params.month);
            const day = parseInt(req.params.day);
            const MateriaModel = MateriaModelCreator(connection);
            const GrupoModel = GrupoModelCreator(connection);
            const EstudianteModel = EstudianteModelCreator(connection);
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.find({
                "subject": subjectID,
                "group": groupID,
                "student": studentID,
                'dateData.year': year,
                'dateData.month': month,
                'dateData.day': day,
            }).populate("subject").populate("group").populate("student");
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({error: error.message});
        }
    });
    //------GETS ALL ATTENDANCE BY STUDENT AND STATUS------//
    routes.get("/student/:studentID/status/:status", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const EstudianteModel = EstudianteModelCreator(connection);
            const GrupoModel = GrupoModelCreator(connection);
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.find({
                "student": req.params.studentID,
                "status": req.params.status
            }).populate("student").populate("group").populate("subject");
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({error: error.message});
        }
    });
    //------GETS ALL ATTENDANCE BY GROUP AND STATUS------//
    routes.get("/group/:groupID/status/:status", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const GrupoModel = GrupoModelCreator(connection);
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.find({
                "group": req.params.groupID,
                "status": req.params.status
            }).populate("group").populate("status");
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({error: error.message});
        }
    });
    //------GETS ALL ATTENDANCE BY SUBJECT AND STATUS------//
    routes.get("/subject/:subjectID/status/:status", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const MateriaModel = MateriaModelCreator(connection);
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.find({
                "subject": req.params.subjectID,
                "status": req.params.status
            }).populate("subject").populate("status");
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({error: error.message});
        }
    });
    //------GETS ALL ATTENDANCE BY GROUP, SUBJECT AND STATUS------//
    routes.get("/group/:groupID/subject/:subjectID/status/:status", async (req, res) => {
        const connection = await mongoose.createConnection(urlDB);
        try {
            const GrupoModel = GrupoModelCreator(connection);
            const MateriaModel = MateriaModelCreator(connection);
            const AsistenciaModel = AsistenciaModelCreator(connection);
            const data = await AsistenciaModel.find({
                "group": req.params.groupID,
                "subject": req.params.subjectID,
                "status": req.params.status
            }).populate("group").populate("subject").populate("status");
            res.json(data);
            connection.close();
        } catch (error) {
            connection.close();
            res.status(500);
            res.json({error: error.message})
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