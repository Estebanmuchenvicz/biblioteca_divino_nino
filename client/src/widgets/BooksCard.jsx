import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

export default function BooksCard({ total }) {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <LibraryBooksIcon color="primary" fontSize="large" />
        <Typography variant="h6">Cantidad de Libros</Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
}
