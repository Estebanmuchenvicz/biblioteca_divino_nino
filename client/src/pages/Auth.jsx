
import { Box } from "@mui/material";
import LoginCard from "../components/LoginCard";
import RegisterCard from "../components/RegisterCard";
import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";

const Auth = () => {
   const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#ffffffff", }}>
      {/* Lado izquierdo */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#4B5FFF",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        
  <img 
    src={logo}
    alt="Biblioteca" 
    style={{ width: "150px", marginBottom: "20px" }} 
  />
<h1>Hola {isLogin ? "de nuevo!" : "nuevo bibliotecario!"} 👋</h1> 
<p>
  {isLogin
    ? "Bienvenido de nuevo. Accede rápidamente a tus tareas de gestión de la biblioteca y optimiza tu tiempo."
    : "Crea tu cuenta y comienza a gestionar libros y préstamos de manera sencilla y rápida."}
</p>

      </Box>

      {/* Lado derecho */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        {isLogin ? <LoginCard  /> : <RegisterCard />}
      </Box>
    </Box>
  );
};

export default Auth;


