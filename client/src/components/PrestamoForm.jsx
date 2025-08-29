import { useState, useEffect } from "react";
import { Box, TextField, Button, MenuItem, Typography, Autocomplete } from "@mui/material";
import { useStore } from "../store/useStore";
import AlertCustom from "../widgets/Alerts";

export default function PrestamoForm() {
  const { libros, fetchLibros, addPrestamo } = useStore();
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");

  const [form, setForm] = useState({
    nombre_apellido: "",
    titulo: "",
    cantidad: 1,
    nivel: "Primaria",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLibros(); // traemos los libros
  }, [fetchLibros]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre_apellido || !form.titulo) {
      setError("Todos los campos obligatorios deben completarse");
      return;
    }

    try {
      await addPrestamo(form);
      setForm({
        nombre_apellido: "",
        titulo: "",
        cantidad: 1,
        nivel: "Primaria",
      });
      setError("");
          setAlertMessage("Prestamo generado correctamente ✔");
      setAlertSeverity("success");
      setAlertOpen(true);
    } catch (err) {
         console.error(err);
      
      setAlertMessage("Error al realizar devolución");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
{libros.length > 0 ? (
  <>
    <Typography variant="h5" sx={{ mb: 2 }}>
      Registrar Préstamo
    </Typography>

    <TextField
      fullWidth
      label="Nombre y Apellido"
      name="nombre_apellido"
      value={form.nombre_apellido}
      onChange={handleChange}
      required
      sx={{ mb: 2 }}
    />

    <Autocomplete
      options={libros} // 👈 usar el array de libros
      getOptionLabel={(option) => `${option.titulo} (${option.cantidad})`}
      value={libros.find((libro) => libro.titulo === form.titulo) || null}
      onChange={(event, newValue) => {
        setForm((prev) => ({ ...prev, titulo: newValue ? newValue.titulo : "" }));
      }}
      renderInput={(params) => (
        <TextField {...params} label="Libro" required sx={{ mb: 2 }} />
      )}
    />

    <TextField
      fullWidth
      type="number"
      label="Cantidad"
      name="cantidad"
      value={form.cantidad}
      onChange={handleChange}
      inputProps={{ min: 1 }}
      required
      sx={{ mb: 2 }}
    />

    <TextField
      fullWidth
      select
      label="Nivel"
      name="nivel"
      value={form.nivel}
      onChange={handleChange}
      sx={{ mb: 2 }}
    >
      <MenuItem value="Primaria">Primaria</MenuItem>
      <MenuItem value="Secundaria">Secundaria</MenuItem>
      <MenuItem value="Superior">Superior</MenuItem>
    </TextField>

    {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

    <Button type="submit" variant="contained" color="primary">
      Registrar
    </Button>
  </>
  
) : (
  <Typography variant="h6" color="text.secondary">
    Debes cargar un libro para poder realizar préstamos
  </Typography>
)}
<AlertCustom open={alertOpen} handleClose={() => setAlertOpen(false)} severity={alertSeverity} message={alertMessage} />
    </Box>
  );
}
