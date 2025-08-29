// SidebarLayout.jsx
import React from "react";
import { Box, Toolbar } from "@mui/material";
import Sidebar from ".."; // tu componente de sidebar

const drawerWidth = 240;

export default function SidebarLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      {/* NAV */}
      <Sidebar />

      {/* CONTENIDO */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* Este Toolbar sirve de "espaciador" para que el AppBar no tape el contenido en mobile */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
