import { create } from "zustand";
import axiosInstance from "@/app/lib/axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

interface AuthUser {
  id: string;
  email: string;
}

interface DecodedToken {
  exp: number;
  sub: string;
}

interface AuthStore {
  authUser: AuthUser | null;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isCheckingAuth: boolean;
  isSigningUp: boolean;

  login: (data: { email: string; password: string }) => Promise<void>;
  signup: (data: { fullname: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingAuth: true,
  isSigningUp: false,

  // Login function
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/login", data);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      set({ authUser: user });
      toast.success("Login berhasil!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login gagal");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Signup function
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/register", {
        name: data.fullname,
        email: data.email,
        password: data.password,
      });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      set({ authUser: user });
      toast.success("Akun berhasil dibuat!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal membuat akun");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Logout function
  logout: () => {
    set({ isLoggingOut: true });
    localStorage.removeItem("token");
    set({ authUser: null });
    toast.success("Berhasil logout!");
    set({ isLoggingOut: false });
  },

  // Check authentication
  // Tetepin yang ini bro, udah aman.
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    const token = localStorage.getItem("token");
  
    if (!token) {
      set({ authUser: null, isCheckingAuth: false });
      return;
    }
  
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
  
      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        set({ authUser: null });
        return;
      } else {
        const response = await axiosInstance.get(
          `/users/${decoded.sub}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        set({ authUser: response.data });
      }

  
    } catch (error: any) {
      console.error("Error saat checkAuth", error);
      localStorage.removeItem("token");
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  }
}));
