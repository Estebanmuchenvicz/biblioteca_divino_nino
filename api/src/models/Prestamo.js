const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Prestamo = sequelize.define('Prestamo', {
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  nombre_apellido: { type: DataTypes.STRING, allowNull: false },
  titulo: { type: DataTypes.STRING, allowNull: false },
  fecha_retiro: { type: DataTypes.DATEONLY, allowNull: false },
  fecha_devolucion: { type: DataTypes.DATEONLY },
  estado: { type: DataTypes.ENUM('retirado', 'sin devolución', 'devuelto'), defaultValue: 'retirado' },
  nivel: { type: DataTypes.ENUM('Primaria', 'Secundaria', 'Superior') }
});

module.exports = Prestamo;
