const express = require('express');
const { Router } = require('express');
const mongoose = require('mongoose');
const AdminModelCreator = require('../models/adminModel');
const routes = Router();
const urlDB = "mongodb://localhost:27017";

const jwt = require('jsonwebtoken');
const jwt_token = 'TOKEN';

routes.post("/", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const AdminModel = AdminModelCreator(connection);
        const { email, password } = req.body;
        let admin = await AdminModel.findOne({ "email": email });

        if (! (email && password)) {
            res.status(400).send("All input is required");
        }
        if (password === admin.password) {
            const token = jwt.sign(
                { _id: admin._id, email, role: admin.role },
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