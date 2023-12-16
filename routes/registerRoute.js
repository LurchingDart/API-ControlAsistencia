const express = require('express');
const Router = require('express');
const mongoose = require('mongoose');
const ProfesorModelCreator = require('../models/profesorModel');
const EstudianteModelCreator = require('../models/estudianteModel');
const AdminModelCreator = require('../models/adminModel');
const routes = Router();
const urlDB = "mongodb+srv://test:HGWJGI7tfgNtpxAm@asistencia.4nf2nve.mongodb.net/test";

const jwt = require('jsonwebtoken');
const jwt_token = 'TOKEN';

routes.post("/profesor", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const ProfesorModel = ProfesorModelCreator(connection);
        const { name, lastName, email, password } = req.body;

        if (! (name && lastName && email && password)) {
            res.status(400).send("All input is required");
        }

        let data = await ProfesorModel.findOne({ "email": req.body.email });

        if (data) {
            res.status(400).send("User Already Exist. Please Login or Register using another email");
        } else {
            let user = ProfesorModel(req.body);
            data = await user.save();
            const token = jwt.sign(
                { _id: data._id, email },
                jwt_token,
                {
                    expiresIn: "168h",
                }
            );
            user = { ...user._doc, token };
            res.status(200).json(user);
            connection.close();
        }
        } catch (error) {
            console.log(error);
            res.send("Error en el servidor");
        }
    });

routes.post("/estudiante", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const EstudianteModel = EstudianteModelCreator(connection);
        const { studentId, name, lastName, email, password, grade, group, teacher } = req.body;

        if (! (studentId && name && lastName && email && password && grade && group && teacher)) {
            res.status(400).send("All input is required");
        }

        let data = await EstudianteModel.findOne({ "email": req.body.email });

        if (data) {
            res.status(400).send("User Already Exist. Please Login or Register using another email");
        } else {
            let user = new EstudianteModel(req.body);
            data = await user.save();
            const token = jwt.sign(
                { _id: data._id, email },
                jwt_token,
                {
                    expiresIn: "168h",
                }
            );
            user = { ...user._doc, token };
            res.status(200).json(user);
            connection.close();
        }
        } catch (error) {
            console.log(error);
            res.send("Error en el servidor");
        }
    });

routes.post("/admin", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const AdminModel = AdminModelCreator(connection);
        const { name, email, password, userName } = req.body;

        if (! ( name && email && password && userName)) {
            res.status(400).send("All input is required");
        }

        let data = await AdminModel.findOne({ "email": req.body.email });

        if (data) {
            res.status(400).send("User Already Exist. Please Login or Register using another email");
        } else {
            let user = new AdminModel(req.body);
            data = await user.save();
            const token = jwt.sign(
                { _id: data._id, email },
                jwt_token,
                {
                    expiresIn: "168h",
                }
            );
            user = { ...user._doc, token };
            res.status(200).json(user);
            connection.close();
        }
        } catch (error) {
            console.log(error);
            res.send("Error en el servidor");
        }
    });

module.exports = routes;