import { Box, Typography, Button, Paper, List } from "@mui/material";
import { useState } from "react";
import differenceInHours from "date-fns/differenceInHours";
import { useStore } from "../store/useStore";
import AlertCustom from "../widgets/Alerts";

export default function PrestamosList() {
  const { prestamos,  devolverPrestamo } = useStore();
      const [alertOpen, setAlertOpen] = useState(false);
      const [alertMessage, setAlertMessage] = useState("");
      const [alertSeverity, setAlertSeverity] = useState("success");

  const handleDevolver = async (id) => {
    try {
    devolverPrestamo(id)
              setAlertMessage("Libro devuelto correctamente ✔");
      setAlertSeverity("success");
      setAlertOpen(true);
      
  
    } catch (err) {
      console.error(err);
    setAlertMessage("Error al crear el préstamo");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        p: 1,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 2,
        height: "100%",
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
      >
        Préstamos
      </Typography>

      <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {prestamos
          .slice()
          .sort((a, b) => {
            if (a.estado === "devuelto" && b.estado !== "devuelto") return 1;
            if (a.estado !== "devuelto" && b.estado === "devuelto") return -1;
            return 0;
          })
          .map((p) => {
            const horasTranscurridas = differenceInHours(
              new Date(),
              new Date(p.fecha)
            );

            let color = "inherit";
            if (p.estado === "devuelto") color = "gray";
            else if (horasTranscurridas <= 72) color = "green";
            else color = "red";

            return (
              <Paper
                key={p.id}
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderLeft: `6px solid ${color}`,
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {p.libro} - {p.usuario}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fecha retiro: {p.fecha} | Estado: {p.estado}
                  </Typography>
                </Box>

                {p.estado !== "devuelto" && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleDevolver(p.id)}
                  >
                    Marcar devuelto
                  </Button>
                )}
              </Paper>
            );
          })}
      </List>
      
<AlertCustom open={alertOpen} handleClose={() => setAlertOpen(false)} severity={alertSeverity} message={alertMessage} />
    </Box>
    
  );
}

