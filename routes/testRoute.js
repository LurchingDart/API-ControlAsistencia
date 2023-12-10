const express = require('express');
const { Router } = require('express');
const mongoose = require('mongoose');
const TestModelCreator = require('../models/testModel');
const routes = Router();
const urlDB = "mongodb://localhost:27017";

//------Endpoints------//

//------GET------//

routes.get("/", async (req, res) => {
    const connection = await mongoose.createConnection(urlDB);
    try {
        const TestModel = TestModelCreator(connection);
        const test = await TestModel.find();
        res.json(test);
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
        const TestModel = TestModelCreator(connection);
        const test = new TestModel(req.body);
        const data = await test.save();
        res.json(data);
        connection.close();
    } catch (error) {
        connection.close();
        res.status(500);
        res.json({ error: error.message });
    }
});

routes.get("/test", (req, res) => {
    res.send("Test de funcionamiento");
});

module.exports = routes;