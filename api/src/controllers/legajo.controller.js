const Legajo = require("../models/Legajo");
const path = require("path");
const fs = require("fs");

// Obtener todos los legajos
exports.getAll = async (req, res) => {
  try {
    const legajos = await Legajo.findAll({
      order: [ ["apellido", "ASC"]],
    });
    res.json(legajos);
  } catch (err) {
    res.status(500).json({ error: err.message });
    
  }
};

// Crear un legajo (subir imagen)
exports.create = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No se subió archivo" });

    let { nombre, apellido } = req.body;

    if (!nombre || !apellido) {
      return res.status(400).json({ error: "Faltan campos: nombre o apellido" });
    }

        // Capitalizar primera letra
    const capitalizar = (texto) =>
      texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();

    if(nombre){nombre = capitalizar(nombre.trim());}
    if(apellido){apellido = capitalizar(apellido.trim());}
    
    const legajo = await Legajo.create({
      nombre,
      apellido,
      url: `/uploads/${req.file.filename}`, // ruta accesible desde frontend
    });

    res.json(legajo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un legajo (y borrar archivo)
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const legajo = await Legajo.findByPk(id);
    if (!legajo) return res.status(404).json({ error: "Legajo no encontrado" });

    // borrar archivo físico
    const filePath = path.join(__dirname, "../../uploads", path.basename(legajo.imagen));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await legajo.destroy();
    res.json({ message: "Legajo eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
