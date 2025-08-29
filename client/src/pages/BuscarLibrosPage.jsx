import React, { useEffect } from 'react';
import { Box, TextField, Grid, Card, CardContent, Typography } from '@mui/material';
import { useStore } from '../store/useStore';

export default function BuscarLibrosPage() {
  const { searchLibros, query, setQuery, fetchRecomendados } = useStore();

  useEffect(() => {
    fetchRecomendados();
  }, []);

  return (
    <Box p={2}>
      <TextField
        fullWidth
        label="Buscar libros..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={2}>
        {searchLibros.map((libro) => (
          <Grid item xs={12} sm={6} md={4} key={libro.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{libro.titulo}</Typography>
                <Typography variant="body2">Autor: {libro.autor}</Typography>
                <Typography variant="body2">Categoría: {libro.categoria}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
