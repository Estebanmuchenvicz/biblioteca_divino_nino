import React, { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

const colores = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57"];

export default function ReportesPrestamosPage() {
  const [periodo, setPeriodo] = useState("dia");

  const { reportes, fetchReportes, loadingReportes, errorReportes } = useStore();

  useEffect(() => {
    fetchReportes(periodo);
  }, [periodo, fetchReportes]);

  const nivelData = Object.entries(reportes.porNivel ?? {}).map(([nivel, cantidad]) => ({
    name: nivel,
    value: cantidad,
  }));

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        📊 Reporte de Préstamos
      </Typography>

      <FormControl sx={{ mb: 4, minWidth: 150 }}>
        <InputLabel>Periodo</InputLabel>
        <Select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
          <MenuItem value="dia">Hoy</MenuItem>
          <MenuItem value="semana">Última semana</MenuItem>
          <MenuItem value="mes">Último mes</MenuItem>
        </Select>
      </FormControl>

      {loadingReportes ? (
        <Typography>Cargando reportes...</Typography>
      ) : errorReportes ? (
        <Typography color="error">{errorReportes}</Typography>
      ) : (
        <>
          <Typography variant="h6">Total de libros prestados: {reportes.totalPrestados}</Typography>
          <Typography variant="h6">Total de libros devueltos: {reportes.devueltos}</Typography>

          <Box sx={{ mt: 4, display: "flex", gap: 6, flexWrap: "wrap" }}>
            <PieChart width={400} height={300}>
              <Pie
                data={nivelData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {nivelData.map((_, index) => (
                  <Cell key={index} fill={colores[index % colores.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>

            <BarChart width={500} height={300} data={nivelData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </Box>
        </>
      )}
    </Box>
  );
}
