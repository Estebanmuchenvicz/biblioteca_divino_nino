const Inventario = require("./Inventario");
const Prestamo = require("./Prestamo");
const Legajo = require("./Legajo");
const  User  = require('./User');




// Relaciones (ejemplo: un préstamo está ligado a un inventario)
Inventario.hasMany(Prestamo, { foreignKey: "inventarioId" });
Prestamo.belongsTo(Inventario, { foreignKey: "inventarioId" });

User.hasMany(Prestamo, { foreignKey: 'userId' });
Prestamo.belongsTo(User, { foreignKey: 'userId' });

module.exports = { Inventario, Prestamo, Legajo };
