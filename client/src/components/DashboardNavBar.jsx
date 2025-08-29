import * as React from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Book";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BarChartIcon from "@mui/icons-material/BarChart";
import SearchIcon from "@mui/icons-material/Search";
import LayersIcon from "@mui/icons-material/Layers";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";

const drawerWidth = 250;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, link: "/" },
  { text: "Agregar libro", icon: <BookIcon />, link: "/agregar-libro" },
  { text: "Generar préstamo", icon: <AssignmentIcon />, link: "/generar-prestamo" },
  { text: "Cargar legajo", icon: <PersonAddIcon />, link: "/cargar-legajo" },
  { text: "Préstamos", icon: <BarChartIcon />, link: "/prestamos" },
  { text: "Legajos", icon: <LayersIcon />, link: "/legajos" },
  { text: "Buscar libro", icon: <SearchIcon />, link: "/buscar-libro" },
];

function SidebarContent() {

  
  const logout = useUserStore((state) => state.logout);
  const nombre = localStorage.getItem("nombre");
  const mail = localStorage.getItem("mail");
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout();            // limpia el store + localStorage
    navigate("/login");  // redirige a la página de login
  };





  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        background: "linear-gradient(to bottom, #1976d2, #2196f3)",
        color: "#fff",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <img src={logo} alt="Logo" style={{ width: 40, marginRight: 10 }} />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Biblioteca Divino Niño
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.link}
              sx={{
                color: "#fff",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: "auto", pt: 2 }}>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
           <Avatar>
             {nombre ? nombre.charAt(0).toUpperCase() : ""}
          </Avatar >
          <Box sx={{ ml: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {nombre}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 12 }}>
              {mail}
            </Typography>
          </Box>
        </Box>

        <List>
          <ListItem disablePadding>
            <ListItemButton
            onClick={handleLogout}
              sx={{
                color: "#fff",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                
                
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default function SidebarLayout({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar solo mobile */}
      <AppBar
        position="fixed"
        sx={{
          display: { sm: "none" },
          backgroundColor: "#1976d2",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Blioteca Divino Niño
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        open
      >
        <SidebarContent />
      </Drawer>

      {/* Drawer Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <SidebarContent />
      </Drawer>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          mt: { xs: "64px", sm: 0 },
          minHeight: "100vh",
        }}
      >
        <Outlet />
        {children}
      </Box>
    </Box>
  );
}
