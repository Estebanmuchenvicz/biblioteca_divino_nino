import { create } from "zustand";
import api from "../api";

export const useUserStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  init: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ token });
      try {
        const res = await api.get("/usuarios/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });
        set({ user: res.data.user });
      } catch {
        set({ user: null, token: null });
        localStorage.removeItem("token");
      }
    }
  },

  register: async (data) => {
    set({ loading: true, error: null });
    try {
      await api.post("/usuarios/registro", data);
      await get().login(data.mail, data.password);
    } catch (err) {
      set({ error: err.response?.data?.error || err.message });
    } finally {
      set({ loading: false });
    }
  },

  login: async (mail, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/usuarios/login", { mail, password });
      const token = res.data.token;
  
      localStorage.setItem("token", token);
      
      const decoded = parseJwt(token);
      const nombre = decoded.nombre;
      const email = decoded.mail;
      localStorage.setItem("nombre", nombre)
      localStorage.setItem("mail", email)
      set({ user: decoded, token });


    } catch (err) {
      set({ error: err.response?.data?.error || err.message });
    
    } finally {
      set({ loading: false });
    }
  },

  fetchProfile: async () => {
    const token = get().token;
    if (!token) return;
    set({ loading: true, error: null });
    try {
      const res = await api.get("/usuarios/perfil", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ user: res.data.user });
    } catch (err) {
      set({ error: err.response?.data?.error || err.message });
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("mail");
    localStorage.removeItem("nombre");
  },
}));

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};