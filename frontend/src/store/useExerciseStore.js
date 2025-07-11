import toast from "react-hot-toast";
import  Axios from "../lib/axios.js";
import { create } from "zustand";




export const useExerciseStore = create((set) => ({
  isLoading: false,
  Exercise: null,
  create: async (name , description , duration , sets , reps , weight) => {
    try {
      set({ isLoading: true });
      const { data } = await Axios.post("/Exercise/Create", {
        name,
        description,
        duration,
        sets,
        reps,
        weight
      });
      set({ isLoading: false , Exercise: data });

      toast.success("exercise created successfully")
    } catch (error) {
      set({ isLoading: false });
      toast.error(error?.response?.data?.message)
    }
  },
  delete: async (id) => {
    try {
      set({ isLoading: true });
      await Axios.delete(`/Exercise/delete/${id}`);
      set({ isLoading: false, Exercise: null });
      toast.success("exercise deleted successfully");
    } catch (error) {
      set({ isLoading: false });
      toast.error(error?.response?.data?.message);
    }
  }
}));