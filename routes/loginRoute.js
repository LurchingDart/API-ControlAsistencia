const express = require('express');
const { Router, query} = require('express');
const mongoose = require('mongoose');
const ProfesorModelCreator = require('../models/profesorModel');
const EstudianteModelCreator = require('../models/estudianteModel');
const AdminModelCreator = require('../models/adminModel');
const routes = Router();
const urlDB = "mongodb://localhost:27017";

const jwt = require('jsonwebtoken');
const jwt_token = 'TOKEN';

routes.post("/profesor", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const ProfesorModel = ProfesorModelCreator(connection);
        const { email, password } = req.body;
        let teacher = await ProfesorModel.findOne({ "email": email });

        if (! (email && password)) {
            res.status(400).send("All input is required");
        }
        else if (teacher && password === teacher.password) {
            const token = jwt.sign(
                { _id: teacher._id, email: teacher.email, role: teacher.role },
                jwt_token,
                {
                    expiresIn: "168h",
                }
            );
            teacher = { ...teacher._doc, token };
            res.status(200).json(teacher);
        }
        else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
});

routes.post("/estudiante", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const EstudianteModel = EstudianteModelCreator(connection);
        const { studentId, email, password } = req.body;
        const identifier = studentId || email;

        let query;
        if (isNaN(identifier)) {
            query = { "email": identifier };
        } else {
            query = { "studentId": identifier };
        }

        let student = await EstudianteModel.findOne(query);

        if (! (identifier && password)) {
            res.status(400).send("All input is required");
        }
        else if (student && password === student.password) {
            const token = jwt.sign(
                { _id: student._id, email: student.email, role: student.role },
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

routes.post("/admin", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const AdminModel = AdminModelCreator(connection);
        const { userName, email, password } = req.body;
        const identifier = userName || email;

        let admin = await AdminModel.findOne({
            $or: [
            { "userName": identifier },
            { "email": identifier }
            ]
        }
        );
        if (! (identifier && password)) {
            res.status(400).send("All input is required");
        }
        else if (admin && password === admin.password) {
            const token = jwt.sign(
                { _id: admin._id, email: admin.email, role: admin.role },
                jwt_token,
                {
                    expiresIn: "168h",
                }
            );
            admin = { ...admin._doc, token };
            res.status(200).json(admin);
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