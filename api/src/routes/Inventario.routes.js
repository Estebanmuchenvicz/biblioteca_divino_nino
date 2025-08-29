const express = require("express");
const router = express.Router();
const inventarioCtrl = require("../controllers/inventario.controller");

router.get("/", inventarioCtrl.getAll);
router.post("/", inventarioCtrl.create);
router.put("/:id", inventarioCtrl.update);
router.delete("/:id", inventarioCtrl.delete);
router.get("/buscar", inventarioCtrl.buscar);
module.exports = router;

