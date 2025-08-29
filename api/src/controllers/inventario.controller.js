const Inventario = require("../models/Inventario");
const { Op } = require('sequelize');

// Obtener todos los libros
exports.getAll = async (req, res) => {
  try {
    const inventario = await Inventario.findAll();
    res.json(inventario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un libro
exports.create = async (req, res) => {
  try {
            
    const capitalizar = (texto) =>
      texto.toLowerCase().split(" ").map(palabra=>palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ")


    if(req.body.titulo) {req.body.titulo = capitalizar(req.body.titulo.trim());}
    if(req.body.autor){req.body.autor = capitalizar(req.body.autor.trim());}
    if(req.body.editorial){req.body.editorial = capitalizar(req.body.editorial.trim());}
    
    const libro = await Inventario.create(req.body);

    res.json(libro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un libro
exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    const libro = await Inventario.findByPk(id);
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
    await libro.update(req.body);
    res.json(libro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un libro
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const libro = await Inventario.findByPk(id);
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
    await libro.destroy();
    res.json({ message: "Libro eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// Obtener libros con búsqueda opcional
exports.buscar  = async (req, res) => {
  try {
    const { q } = req.query; // q = texto de búsqueda
  console.log('Query recibida:', q);

    let where = {};
    
    if (q) {
      // Sequelize Op.like para búsqueda parcial en titulo, autor o categoria
      
      where = {
        [Op.or]: [
          { titulo: { [Op.iLike]: `%${q}%` } }, // iLike = insensible a mayúsculas (Postgres)
          { autor: { [Op.iLike]: `%${q}%` } },
          
        ]
      };
    }

    const inventario = await Inventario.findAll({
      where,
      order: [['createdAt', 'DESC']], // últimos agregados primero
      limit: 10
    });

    res.json(inventario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

