const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Legajo = sequelize.define('Legajo', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellido: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Legajo;
