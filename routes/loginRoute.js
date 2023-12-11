const express = require('express');
const { Router } = require('express');
const mongoose = require('mongoose');
const ProfesorModelCreator = require('../models/profesorModel');
const EstudianteModelCreator = require('../models/estudianteModel');
const routes = Router();
const urlDB = "mongodb://localhost:27017";

const jwt = require('jsonwebtoken');
const jwt_token = 'TOKEN';

routes.post("/profesor", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const ProfesorModel = ProfesorModelCreator(connection);
        const { email, password } = req.body;
        let user = await ProfesorModel.findOne({ "email": email });

        if (! (email && password)) {
            res.status(400).send("All input is required");
        }
        if (password === user.password) {
            const token = jwt.sign(
                { _id: user._id, email, role: user.role },
                jwt_token,
                {
                    expiresIn: "168h",
                }
            );
            user = { ...user._doc, token };
            res.status(200).json(user);
        }
        else {
            res.status(400).send("Invalid Credentials");
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
        const { email, password } = req.body;
        let student = await EstudianteModel.findOne({ "email": email });

        if (! (email && password)) {
            res.status(400).send("All input is required");
        }
        if (password === student.password) {
            const token = jwt.sign(
                { _id: student._id, email, role: student.role },
                jwt_token,
                {
                    expiresIn: "168h",
                }
            );
            student = { ...student._doc, token };
            res.status(200).json(student);
        }
        else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (error) {
        console.log(error);
        res.send("Error en el servidor");
    }
});

module.exports = routes;