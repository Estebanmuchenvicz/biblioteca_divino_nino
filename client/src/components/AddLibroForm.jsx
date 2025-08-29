// src/components/AddLibroForm.jsx
import React, { useState } from "react";
import { Box, Button, MenuItem, TextField, Typography, Paper } from "@mui/material";
import AlertCustom from "../widgets/Alerts";
import { useStore } from "../store/useStore";

const categorias = ["Matemáticas", "Lengua", "Cs. Naturales", "Cs. Sociales", "Historia", "Lengua Extranjera", "Geometría", "TIC", "Geografía", "Otras",];
const niveles = ["Primaria", "Secundaria", "Superior"];

const AddLibroForm = () => {
  const addLibro = useStore((state) => state.addLibro);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    editorial: "",
    categoria: "",
    cantidad: "",
    nivel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addLibro(formData); // ✅ Llamada al store
      setAlertMessage("Libro agregado correctamente");
      setAlertSeverity("success");
      setAlertOpen(true);
      setFormData({
        titulo: "",
        autor: "",
        editorial: "",
        categoria: "",
        cantidad: "",
        nivel: "",
      });
    } catch (error) {
      console.error(error);
      setAlertMessage("Error al agregar libro");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>Agregar Libro</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
        <TextField label="Título" name="titulo" value={formData.titulo} onChange={handleChange} required />
        <TextField label="Autor" name="autor" value={formData.autor} onChange={handleChange} />
        <TextField label="Editorial" name="editorial" value={formData.editorial} onChange={handleChange} />
        <TextField select label="Categoría" name="categoria" value={formData.categoria} onChange={handleChange} required>
          {categorias.map((cat) => (<MenuItem key={cat} value={cat}>{cat}</MenuItem>))}
        </TextField>
        <TextField label="Cantidad" name="cantidad" type="number" value={formData.cantidad} onChange={handleChange} />
        <TextField select label="Nivel" name="nivel" value={formData.nivel} onChange={handleChange} required>
          {niveles.map((niv) => (<MenuItem key={niv} value={niv}>{niv}</MenuItem>))}
        </TextField>
        <Button type="submit" variant="contained" color="primary">Guardar</Button>
      </Box>
      <AlertCustom open={alertOpen} handleClose={() => setAlertOpen(false)} severity={alertSeverity} message={alertMessage} />
    </Paper>
  );
};

export default AddLibroForm;
