import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SidebarLayout from "../components/DashboardNavBar";
import Dashboard from "../pages/DashboardPage";
import AgregarLibroPage from "../pages/AgregarLibro";
import GenerarPrestamoPage from "../pages/PrestamosPage";
import CargarLegajoPage from "../pages/CargarLegajoPage";
import LegajosPage from "../pages/LegajosPage";
import ErrorPage from "../pages/ErrorPage";
import ReportesPrestamosPage from "../pages/ReportesPretamosPage";
import Auth from "../pages/Auth";
import BuscarLibrosPage from "../pages/buscarLibrosPage";
import PrivateRoute from "../components/PrivateRoute"; // nuestro wrapper

const router = createBrowserRouter([
  // Rutas públicas
  { path: "/login", element: <Auth /> },
  { path: "/register", element: <Auth /> },

  // Rutas protegidas con navbar
  {
    element: (
      <PrivateRoute>
        <SidebarLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/", element: <Dashboard />, errorElement: <ErrorPage /> },
      { path: "/agregar-libro", element: <AgregarLibroPage /> },
      { path: "/generar-prestamo", element: <GenerarPrestamoPage /> },
      { path: "/cargar-legajo", element: <CargarLegajoPage /> },
      { path: "/legajos", element: <LegajosPage /> },
      { path: "/prestamos", element: <ReportesPrestamosPage /> },
      { path: "/buscar-libro", element: <BuscarLibrosPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
