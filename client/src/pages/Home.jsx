
import React, { useState } from "react";
import DashboardNavBar from "../components/DashboardNavBar";
import { Container, Typography } from "@mui/material";
import Auth from "./Auth";
import DashboardPage from "./DashboardPage";

export default function Home() {
      const [user, setUser] = useState("ESTEBAN");


  const handleLogin = (userData) => {
    setUser(userData); // aquí guardás los datos del usuario logueado
  };

  if (!user) {
    // Si no hay usuario logueado, mostramos el login
    return <Auth onLogin={handleLogin} />;
  }
  return (
    <>
       <DashboardNavBar />
      <Container sx={{ mt: 10 }}>
  
        <DashboardPage/>
      </Container>
    </>
  );
}
