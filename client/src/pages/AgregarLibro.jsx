// src/pages/AgregarLibro.jsx
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import AddLibroForm from "../components/AddLibroForm";


const AgregarLibro = () => {
  return (
<>
 
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Nuevo Libro
      </Typography>
      <AddLibroForm />
    </Box>
    </>
  );
};

export default AgregarLibro;
