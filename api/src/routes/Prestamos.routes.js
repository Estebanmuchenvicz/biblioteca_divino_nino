const express = require("express");
const router = express.Router();
const prestamosCtrl = require("../controllers/prestamo.controller");

router.get("/", prestamosCtrl.getAll);
router.post("/", prestamosCtrl.create);
router.put("/:id/devolver", prestamosCtrl.devolver);
router.delete("/:id", prestamosCtrl.delete);
router.get("/reportes", prestamosCtrl.reportePrestamos);

module.exports = router;
