const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.BREVO_USER, 
    pass: process.env.BREVO_PASS, 
  },
});

/**
 * Enviar email reutilizable
 * @param {string} to - destinatario
 * @param {string} subject - asunto
 * @param {string} text - contenido en texto plano
 * @param {string} html - contenido en HTML
 */
const sendEmail = async (to, subject, text, html = null) => {
  try {
    const mailOptions = {
      from: `"Custom Craft" <${process.env.BREVO_USER}>`, // nombre + remitente
      to,
      subject,
      text,
      ...(html && { html }), // si pasás HTML, lo incluye
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Correo electrónico enviado:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error al enviar el correo electrónico:", error);
    throw error;
  }
};

module.exports = { sendEmail };
