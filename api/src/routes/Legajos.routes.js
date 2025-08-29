const express = require("express");
const router = express.Router();
const legajosCtrl = require("../controllers/legajo.controller");
const multer = require("multer");
const path = require("path");

// Configuración multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get("/", legajosCtrl.getAll);
router.post("/", upload.single("imagen"), legajosCtrl.create);
router.delete("/:id", legajosCtrl.delete);

module.exports = router;

