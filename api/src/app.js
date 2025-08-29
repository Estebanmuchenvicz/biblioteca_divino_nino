const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./routes/index.routes');
const morgan = require('morgan');

// Modelos
require("./models/Inventario");
require("./models/Legajo");
require("./models/Prestamo");
require("./models/User");

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // imágenes

// Rutas API
app.use('/', router);





module.exports = app;

