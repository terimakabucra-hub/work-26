import { create } from "zustand";
import API from "../api/axios";

const useStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,

  login: async (email, password) => {
    const { data } = await API.post("/auth/login", { email, password });
    localStorage.setItem("user", JSON.stringify(data));
    set({ user: data });
    return data;
  },

  register: async (name, email, password) => {
    const { data } = await API.post("/auth/register", { name, email, password });
    localStorage.setItem("user", JSON.stringify(data));
    set({ user: data });
    return data;
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },

  updateUser: (updatedData) => {
    const stored = JSON.parse(localStorage.getItem("user")) || {};
    const newUser = { ...stored, ...updatedData };
    localStorage.setItem("user", JSON.stringify(newUser));
    set({ user: newUser });
  },
}));

export default useStore;
