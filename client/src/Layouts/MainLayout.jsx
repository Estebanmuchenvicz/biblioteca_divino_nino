
import React from "react";
import Navbar from "../components/DashboardNavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingLeft: "140px" }}>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
