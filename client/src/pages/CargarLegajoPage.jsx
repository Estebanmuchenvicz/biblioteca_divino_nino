import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import LegajoForm from "../components/LegajoForm";
import { useStore } from "../store/useStore";

const LegajosPage = () => {
  
  const fetchLegajos = useStore((state) => state.fetchLegajos);

  useEffect(() => {
    fetchLegajos();
  }, [fetchLegajos]);

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Legajos
      </Typography>

      <LegajoForm />
    </div>
  );
};

export default LegajosPage;

