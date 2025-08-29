const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users.controller");

// Registro
router.post("/registro", usersCtrl.register);

// Login
router.post("/login", usersCtrl.login);

// Perfil (protegido)
router.get("/perfil", usersCtrl.profile);

module.exports = router;
