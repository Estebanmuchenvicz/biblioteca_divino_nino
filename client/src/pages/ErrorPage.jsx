// src/pages/ErrorPage.jsx
import { Box, Typography, Button } from "@mui/material";
import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 2,
        bgcolor: "#f9f9f9",
      }}
    >
      <Typography variant="h3" color="error">
        Oops!
      </Typography>
      <Typography variant="h6">
        Algo salió mal.  
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {error?.statusText || error?.message}
      </Typography>

      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Volver al inicio
      </Button>
    </Box>
  );
}
