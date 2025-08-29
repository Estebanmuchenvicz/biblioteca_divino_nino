const User = require("../models/User");
const { sendEmail } = require("../services/emailService"); // nuestro emailService.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.SECRET_KEY;

// Registro de usuario
exports.register = async (req, res) => {
  const { nombre, apellido, mail, password, role } = req.body;

  try {
    // 1️⃣ Verificar si el mail ya existe
    const existingUser = await User.findOne({ where: { mail } });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // 2️⃣ Crear nuevo usuario
    const user = await User.create({ nombre, apellido, password, mail, role });

    // 3️⃣ Enviar correo de bienvenida
    const subject = "¡Bienvenido a la Biblioteca Divino Niño 📚!";
    const text = `Hola ${nombre}, gracias por registrarte como bibliotecario en la Biblioteca Divino Niño. Estamos felices de contar contigo para cuidar y compartir nuestro conocimiento.`;
    const html = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #2E8B57;">Hola ${nombre} 👋</h1>
        <p>¡Bienvenido a <b>Biblioteca Divino Niño</b>!</p>
        <p>Gracias por registrarte como <b>bibliotecario</b>. Estamos muy contentos de que formes parte de nuestro equipo, ayudando a mantener y compartir los recursos de nuestra biblioteca con la comunidad.</p>
        <p>Recuerda que podrás gestionar libros, usuarios y actividades desde tu panel de administración.</p>
        <p style="margin-top: 20px;">¡Esperamos que disfrutes esta experiencia! 📖</p>
        <hr>
        <p style="font-size: 12px; color: #777;">Biblioteca Divino Niño - Tu espacio de lectura y conocimiento</p>
      </div>
    `;

    await sendEmail(mail, subject, text, html);

    // 4️⃣ Devolver respuesta
    res.status(201).json({
      message: "Usuario creado y correo de bienvenida enviado",
      user: { id: user.id, nombre: user.nombre, apellido: user.apellido, mail: user.mail, role: user.role },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// Login de usuario
exports.login = async (req, res) => {
  const { mail, password } = req.body;
  try {
    const user = await User.findOne({ where: { mail } });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    const valid = await user.validatePassword(password);
    if (!valid) return res.status(400).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user.id, nombre: user.nombre, mail: user.mail, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login exitoso", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Perfil de usuario (ruta protegida)
exports.profile = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No autorizado" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: "Datos del usuario", user: decoded });
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
};
