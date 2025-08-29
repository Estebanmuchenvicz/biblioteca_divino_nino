const { Router } = require('express');
const prestamosRoutes = require("./Prestamos.routes");
const legajosRoutes = require("./Legajos.routes");
const inventarioRoutes = require('./Inventario.routes');
const usersRoutes = require('./Users.routes');


const router = Router();

// Configurar los routers

router.use("/inventario", inventarioRoutes);
router.use("/prestamos", prestamosRoutes);
router.use("/legajos", legajosRoutes);
router.use('/usuarios',usersRoutes)

module.exports = router;