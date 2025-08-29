// src/components/RegisterCard.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const RegisterCard = () => {
  const navigate = useNavigate();
  const register = useUserStore((state) => state.register);
  const error = useUserStore((state) => state.error);
  const loading = useUserStore((state) => state.loading);

  const [form, setForm] = useState({
    nombre: "",
    apellido:"",
    mail: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    await register({
      nombre: form.nombre,
      apellido: form.apellido,
      mail: form.mail,
      password: form.password,
      role: "usuario", // o lo que corresponda
    });

    const user = useUserStore.getState().user;
    if (user) navigate("/login"); // redirige al perfil si todo OK
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: 400,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        bgcolor: "white",
        borderRadius: 2,
        
      }}
    >
      <Typography variant="h5" align="center">
        Crea una cuenta
      </Typography>

      <Typography variant="body2" align="center">
        Ya tienes una cuenta?{" "}
        <Link component="button" onClick={() => navigate("/login")}>
          Inicia sesión aquí
        </Link>
      </Typography>

      <TextField
        label="Nombre"
        name="nombre"
        variant="outlined"
        fullWidth
        value={form.nombre}
        onChange={handleChange}
        required
      />

            <TextField
        label="Apellido"
        name="apellido"
        variant="outlined"
        fullWidth
        value={form.apellido}
        onChange={handleChange}
        required
      />

      <TextField
        label="Email"
        name="mail"
        variant="outlined"
        fullWidth
        value={form.mail}
        onChange={handleChange}
        required
      />

      <TextField
        label="Contraseña"
        name="password"
        type="password"
        variant="outlined"
        fullWidth
        value={form.password}
        onChange={handleChange}
        required
      />

      <TextField
        label="Confirmar Contraseña"
        name="confirmPassword"
        type="password"
        variant="outlined"
        fullWidth
        value={form.confirmPassword}
        onChange={handleChange}
        required
      />

      {error && <Typography color="error">{error}</Typography>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
      >
        {loading ? "Registrando..." : "Regístrate"}
      </Button>
    </Box>
  );
};

export default RegisterCard;
