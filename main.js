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
const adminRoute = require('./routes/loginAdminRoute');
const asistenciaRoute = require('./routes/asistenciaRoute');
const estudianteRoute = require('./routes/estudianteRoute');
const grupoRoute = require('./routes/grupoRoute');
const loginRoute = require('./routes/loginRoute');
const materiaRoute = require('./routes/materiaRoute');
const profesorRoute = require('./routes/profesorRoute');
const registroRoute = require('./routes/registerRoute');
const registroAdminRoute = require('./routes/registerAdminRoute');


//------Endpoints------//
app.use("/api/asistencia", auth, authorize(['admin', 'teacher']), asistenciaRoute);
app.use("/api/estudiante", estudianteRoute);
app.use("/api/grupo", grupoRoute);
app.use("/login-admin", adminRoute);
app.use("/login", loginRoute);
app.use("/api/materia", materiaRoute);
app.use("/api/profesor", profesorRoute);
app.use("/registro", registroRoute);
app.use("/registro-admin", registroAdminRoute);

//------Main endpoint------//
app.get("/api", (req, res) => {
    res.send("Welcome to the API of the ControlAsistencia project, for more information visit: https://github.com/LurchingDart/API-ControlAsistenica");
});

//------Server------//

app.listen(9000, () => {
    console.log("Listo pa jalar en el puerto 9000");
});

module.exports = app;