import { create } from "zustand";


import  api  from "../api";

export const useStore = create((set, get) => ({
  // Estado global
 
  prestamos: [],
  loadingPrestamos: false,
  errorPrestamos: null,

  //Libros
    libros: [],
  loadingLibros: false,
  errorLibros: null,

  //Legajos
  legajos: [],
  loadingLegajos: false,
  errorLegajos: null,

  //reportes
    reportes: { totalPrestados: 0, devueltos: 0, porNivel: {} },
  loadingReportes: false,
  errorReportes: null,

  //SEARCH LIBROS
  recomendados: [],
  searchLibros:[],
  query: '',
  loading: false,

  // Función para traer préstamos
  fetchPrestamos: async () => {
    set({ loadingPrestamos: true, errorPrestamos: null });
    try {
      const res = await api.get("/prestamos");
       console.log("Respuesta API:", res.data);
      const prestamosRealizados = res.data.map((p) => ({
        id: p.id,
        libro: p.titulo,
        usuario: p.nombre_apellido,
        fecha: p.fecha_retiro,
        fecha_devolucion: p.fecha_devolucion,
        estado: p.estado,
      }));
      set({ prestamos: prestamosRealizados });
    } catch (err) {
      console.error(err);
      set({ errorPrestamos: "Error al cargar los préstamos" });
    } finally {
      set({ loadingPrestamos: false });
    }
  },
//devolucion
  devolverPrestamo: async (id) => {
    try {
      await api.put(`/prestamos/${id}/devolver`);
      get().fetchPrestamos(); // refresca los préstamos
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

    // Crear préstamo
  addPrestamo: async (prestamoData) => {
    try {
      const res = await api.post("/prestamos", prestamoData);
      // Actualizamos la lista automáticamente
      set((state) => ({ prestamos: [res.data, ...state.prestamos] }));
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  // Traer reportes por periodo
  fetchReportes: async (periodo = "dia") => {
    try {
      set({ loadingReportes: true });
      const res = await api.get(`/prestamos/reportes?periodo=${periodo}`);
      set({ reportes: res.data, loadingReportes: false });
    } catch (err) {
      set({ errorReportes: err.message, loadingReportes: false });
    }
  },



  // Traer Libros

  fetchLibros: async () => {
    set({ loadingLibros: true, errorLibros: null });
    try {
      const res = await api.get("/inventario");
      set({ libros: res.data });
    } catch (err) {
      console.error(err);
      set({ errorLibros: "Error al cargar los libros" });
    } finally {
      set({ loadingLibros: false });
    }
  },

  

// Agregar libro
addLibro: async (libroData) => {
  const res = await api.post("/inventario", libroData);
  // Actualizar inventario en el store
  set((state) => ({
    inventario: [...state.libros, res.data],
  }));
  return res.data;
},

// Traer últimos agregados
  fetchRecomendados: async () => {
    set({ loading: true });
    try {
      const res = await api.get('/inventario/buscar');
      set({ recomendados: res.data, searchLibros: res.data, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  // Buscar libros según query
  buscarLibros: async (q) => {
    set({ loading: true });
    try {
      const res = await api.get('/inventario/buscar', { params: { q} });
      set({ searchLibros: res.data, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  // Guardar query y disparar búsqueda
  setQuery: (q) => {
    set({ query: q });
    if (q) {
      get().buscarLibros(q);
    } else {
      set({ searchLibros: get().recomendados });
    }
  },

  




  // Traer todos los legajos
  fetchLegajos: async () => {
    set({ loadingLegajos: true, errorLegajos: null });
    try {
      const res = await api.get("/legajos");
      set({ legajos: res.data, loadingLegajos: false });
    } catch (err) {
      set({ errorLegajos: err.message, loadingLegajos: false });
      console.error(err);
    }
  },

  // Agregar un legajo
  addLegajo: async (formData) => {
    try {
      const res = await api.post("/legajos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Actualizamos el estado automáticamente
      set((state) => ({
        legajos: [res.data, ...state.legajos],
      }));
      return res.data;
    } catch (err) {
      console.error(err);
      throw err; // para que el componente pueda mostrar alerta
    }
  },


  usuarios: [],
  loadingUsuarios: false,
  errorUsuarios: null,
  fetchUsuarios: async () => {
    set({ loadingUsuarios: true, errorUsuarios: null });
    try {
      const res = await api.get("/usuarios");
      set({ usuarios: res.data });
    } catch (err) {
      console.error(err);
      set({ errorUsuarios: "Error al cargar los usuarios" });
    } finally {
      set({ loadingUsuarios: false });
    }
  },
}));
