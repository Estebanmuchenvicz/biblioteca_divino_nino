const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Inventario = sequelize.define('Inventario', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  autor: { type: DataTypes.STRING },
  editorial: { type: DataTypes.STRING },
  categoria: { 
    type: DataTypes.ENUM(
      'Matemáticas', 'Lengua', 'Cs. Naturales', 'Cs. Sociales', 
      'Historia', 'Lengua Extranjera', 'Geometría', 'TIC', 'Geografía', 'Otras'
    ) 
  },
  cantidad: { type: DataTypes.INTEGER, defaultValue: 0 },
  nivel: { type: DataTypes.ENUM('Primaria', 'Secundaria', 'Superior') }
});

module.exports = Inventario;
