
import React, { useState } from "react";
import { Box, TextField, Button, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const LoginCard = () => {
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);
  const error = useUserStore((state) => state.error);
  const loading = useUserStore((state) => state.loading);

  const [form, setForm] = useState({ mail: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form.mail, form.password);
    const user = useUserStore.getState().user;
    if (user) navigate("/"); 
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
        Bienvenido de nuevo!
      </Typography>

      <Typography variant="body2" align="center">
        No tenes cuenta?{" "}
        <Link component="button" onClick={() => navigate("/register")}>
          Crea una cuenta ahora
        </Link>
      </Typography>

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

      {error && <Typography color="error">{error}</Typography>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </Button>

      <Link component="button" sx={{ mt: 1 }} onClick={() => alert("Función de recuperación pendiente")}>
        Has olvidado tu contraseña? Haga clic aquí
      </Link>
    </Box>
  );
};

export default LoginCard;

