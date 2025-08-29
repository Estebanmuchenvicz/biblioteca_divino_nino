
import { Box, Typography } from "@mui/material";
import PrestamoForm from "../components/PrestamoForm";


export default function PrestamosPage() {

  return (
   
      <Box >
        <Typography variant="h4" sx={{ mb: 3 }}>Gestión de Préstamos</Typography>

        {/* Formulario para crear préstamos */}
        <PrestamoForm />

      </Box>
    
  );
}
