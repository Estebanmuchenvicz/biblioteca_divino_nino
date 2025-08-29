const Prestamo = require("../models/Prestamo");
const { Op } = require("sequelize");


// Obtener todos los prestamos
exports.getAll = async (req, res) => {
  try {
    const prestamos = await Prestamo.findAll();
    res.json(prestamos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un prestamo

exports.create = async (req, res) => {
  try {
    let { nombre_apellido, titulo, cantidad, nivel } = req.body;

    nombre_apellido= nombre_apellido.trim().toLowerCase().split(" ").map((p)=>p.charAt(0).toUpperCase()+p.slice(1)).join(" ");
    
    
    
    const prestamo = await Prestamo.create({
      nombre_apellido,
      titulo,
      cantidad,
      nivel,
      fecha_retiro: new Date().toISOString().split("T")[0], // fecha actual
      estado: "retirado", // estado inicial
      // fecha_devolucion queda vacía
    });

    res.status(201).json(prestamo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Marcar préstamo como devuelto
exports.devolver = async (req, res) => {
  const { id } = req.params;
  try {
    const prestamo = await Prestamo.findByPk(id);
    if (!prestamo) return res.status(404).json({ error: "Préstamo no encontrado" });

    // Actualiza automáticamente
    prestamo.fecha_devolucion = new Date().toISOString().split("T")[0];
    prestamo.estado = "devuelto";

    await prestamo.save();

    res.json(prestamo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Eliminar un prestamo
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const prestamo = await Prestamo.findByPk(id);
    if (!prestamo) return res.status(404).json({ error: "Préstamo no encontrado" });
    await prestamo.destroy();
    res.json({ message: "Préstamo eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Reporte general de prestamos
exports.reportePrestamos = async (req, res) => {
  const { periodo } = req.query; // 'dia', 'semana', 'mes'
  let fecha_retiro;

  const hoy = new Date();

  if (periodo === "dia") {
    fecha_retiro = new Date();
    fecha_retiro.setHours(0, 0, 0, 0);
  } else if (periodo === "semana") {
    fecha_retiro = new Date();
    fecha_retiro.setDate(hoy.getDate() - 7);
  } else if (periodo === "mes") {
    fecha_retiro = new Date();
    fecha_retiro.setMonth(hoy.getMonth() - 1);
  } else {
    fecha_retiro = new Date(0); // todos
  }

  try {
    const prestamos = await Prestamo.findAll({
      where: {
        fecha_retiro: { [Op.gte]: fecha_retiro },
      },
    });

    // Total por estado
    const totalPrestados = prestamos.reduce((acc, p) => acc + p.cantidad, 0);
    const devueltos = prestamos.filter(p => p.estado === "devuelto")
                                .reduce((acc, p) => acc + p.cantidad, 0);

    // Por nivel
const porNivel = {};
prestamos.forEach(p => {
  if (!porNivel[p.nivel]) porNivel[p.nivel] = 0;
  porNivel[p.nivel] += p.cantidad;
});


    res.json({ totalPrestados, devueltos, porNivel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
