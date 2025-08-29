import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import AlertCustom from "../widgets/Alerts";
import { useStore } from "../store/useStore";

const LegajoForm = () => {
  const addLegajo = useStore((state) => state.addLegajo);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [imagen, setImagen] = useState(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagen) {
      setAlertMessage("Debes seleccionar una imagen");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("apellido", apellido);
    formData.append("imagen", imagen);

    try {
      await addLegajo(formData);
      setAlertMessage("Legajo agregado correctamente");
      setAlertSeverity("success");
      setAlertOpen(true);

      setNombre("");
      setApellido("");
      setImagen(null);
    } catch (err) {
      setAlertMessage(`Error al agregar legajo ${err}`);
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}
      >
        <TextField label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <TextField label="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
        <input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} required />
        <Button type="submit" variant="contained">
          Subir legajo
        </Button>
      </form>

      <AlertCustom
        open={alertOpen}
        handleClose={() => setAlertOpen(false)}
        severity={alertSeverity}
        message={alertMessage}
      />
    </div>
  );
};

export default LegajoForm;
