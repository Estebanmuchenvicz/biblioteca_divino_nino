import React, { useEffect } from "react";
import { Box, Grid, Typography, CircularProgress, Container } from "@mui/material";
import CalendarMini from "../widgets/CalendarMini";
import PrestamosList from "../widgets/PrestamosList";
import { useStore } from "../store/useStore";



export default function DashboardPage() {
  const { fetchPrestamos, loadingPrestamos, errorPrestamos, prestamos } = useStore();

  useEffect(() => {
     fetchPrestamos();
  }, [fetchPrestamos]);

  if (loadingPrestamos) return <CircularProgress />;
  if (errorPrestamos) return <Typography color="error">{errorPrestamos}</Typography>;

  return (
      <Container sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {prestamos && prestamos.length > 0 ? (
            <PrestamosList />
          ) : (
            <Box sx={{ textAlign: "center", p: 3 }}>
                    <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
      >
        Préstamos
      </Typography>
              <Typography variant="h5" color="text.secondary">
                Aún no tienes préstamos
              </Typography>
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <CalendarMini />
        </Grid>
      </Grid>
    </Container>
  );
}
