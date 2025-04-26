import { create } from "zustand";
import axiosInstance from "@/app/lib/axios";
import toast from "react-hot-toast";

interface Task {
  id: number;
  employee_name: string;
  description: string;
  hours_spent: number;
  hourly_rate: number;
  additional_charges: number;
  total_remuneration: number;
  created_at: string;
  updated_at: string;
}

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  fetchTasks: (userId: string) => Promise<void>;
  addTask: (taskData: Omit<Task, "id" | "employee_name" | "total_remuneration" | "created_at" | "updated_at">) => Promise<void>;
  updateTask: (taskId: number, updatedTask: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isLoading: false,

  fetchTasks: async (userId) => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem("token");

      const res = await axiosInstance.get(`/tasks?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ tasks: res.data.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal ambil data tasks");
    } finally {
      set({ isLoading: false });
    }
  },

  addTask: async (taskData) => {
    try {
      const token = localStorage.getItem("token");

      console.log(taskData)
      const res = await axiosInstance.post(`/tasks`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      set((state) => ({
        tasks: [...state.tasks, res.data],
      }));
      toast.success("Task berhasil ditambahkan");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal tambah task");
    }
  },

  updateTask: async (taskId, updatedTask) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.put(`/tasks/${taskId}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? res.data : task
        ),
      }));
      toast.success("Task berhasil diupdate");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal update task");
    }
  },

  deleteTask: async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }));
      toast.success("Task berhasil dihapus");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal hapus task");
    }
  },
}));
