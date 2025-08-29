const server = require('./src/app');
const conn = require('./src/db');
require ("dotenv").config();
const { PORT } = process.env




// Levantar servidor
server.listen(PORT, async () => {
  await conn.sync({ force: true });
  console.log("✅ Servidor corriendo en:");
  console.log(`👉 Local:   http://localhost:${PORT}`);
});
