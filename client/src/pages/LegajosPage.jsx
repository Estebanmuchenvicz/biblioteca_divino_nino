import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function LegajosPage() {
  const [legajos, setLegajos] = useState([]);
  const [search, setSearch] = useState(""); // 🔍 estado del buscador

  useEffect(() => {
    axios
      .get("http://localhost:3001/legajos")
      .then((res) => setLegajos(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 👉 Función que filtra legajos por nombre o apellido
  const filtrarLegajos = (lista) =>
    lista.filter(
      (l) =>
        l.nombre.toLowerCase().includes(search.toLowerCase()) ||
        l.apellido.toLowerCase().includes(search.toLowerCase()),

    );

  // Agrupamos por inicial del apellido
  const agrupados = legajos.reduce((acc, legajo) => {
    const inicial = legajo.apellido.charAt(0).toUpperCase();
    if (!acc[inicial]) acc[inicial] = [];
    acc[inicial].push(legajo);
    return acc;
  }, {});

  // Ordenamos legajos dentro de cada carpeta
  Object.keys(agrupados).forEach((key) => {
    agrupados[key].sort((a, b) => {
      const apellidoComp = a.apellido.localeCompare(b.apellido);
      if (apellidoComp !== 0) return apellidoComp;
      return a.nombre.localeCompare(b.nombre);
    });
  });

  // Ordenamos carpetas de A a Z
  const carpetasOrdenadas = Object.keys(agrupados).sort();

  return (
    <Box sx={{ p: 4 }}>
      {/* 🔍 Buscador */}
      <TextField
        label="Buscar por nombre o apellido"
        variant="outlined"
        fullWidth
        sx={{ mb: 4 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {carpetasOrdenadas.length === 0 ? (
        <Typography variant="body1">No se encontraron resultados</Typography>
      ) : (
        carpetasOrdenadas.map((carpeta) => {
          const legajosFiltrados = filtrarLegajos(agrupados[carpeta]);
          if (legajosFiltrados.length === 0) return "No se encontraron resultados😢";

          return (
            <Accordion key={carpeta} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <FolderIcon sx={{ color: "#f9a825", mr: 1 }} />
                <Typography variant="h6">Carpeta {carpeta}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  {legajosFiltrados.map((legajo) => (
                    <Grid item xs={12} sm={6} md={4} key={legajo.id}>
                      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={`http://localhost:3001${legajo.url}`}
                          alt={`${legajo.nombre} ${legajo.apellido}`}
                        />
                        <CardContent>
                          <Typography variant="h6">
                            {legajo.apellido}, {legajo.nombre}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })
      )}
    </Box>
  );
}
