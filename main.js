//------Imports------//
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//------App------//
const app = express();

//------Middleware------//
app.use(bodyParser.json());
app.use(cors());
const { auth, authorize } = require('./auth');

//------Routes------//
const asistenciaRoute = require('./routes/asistenciaRoute');
const estudianteRoute = require('./routes/estudianteRoute');
const grupoRoute = require('./routes/grupoRoute');
const loginRoute = require('./routes/loginRoute');
const materiaRoute = require('./routes/materiaRoute');
const profesorRoute = require('./routes/profesorRoute');
const registroRoute = require('./routes/registerRoute');


//------Endpoints------//
app.use("/api/asistencia", auth, authorize(['admin', 'teacher']), asistenciaRoute);
app.use("/api/estudiante", auth, authorize(['admin', 'teacher', 'student']),estudianteRoute);
app.use("/api/grupo", grupoRoute);
app.use("/login", loginRoute);
app.use("/api/materia", auth, authorize(['admin', 'teacher']),materiaRoute);
app.use("/api/profesor", profesorRoute);
app.use("/registro", registroRoute);

//------Main endpoint------//
app.get("/", (req, res) => {
    res.send("Welcome to the API of the ControlAsistencia project, for more information visit: https://github.com/LurchingDart/API-ControlAsistenica");
});

app.get("/api", (req, res) => {
    res.send("Welcome to the API of the ControlAsistencia project, for more information visit: https://github.com/LurchingDart/API-ControlAsistenica");
});

//------Server------//

app.listen(9000, () => {
});

module.exports = app;
