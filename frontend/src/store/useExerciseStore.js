import toast from "react-hot-toast";
import  Axios from "../lib/axios.js";
import { create } from "zustand";




export const useExerciseStore = create((set) => ({
  isLoading: false,
  Exercise: [],
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
  },
  getById : async (id) => {
    try {
      set({ isLoading: true });
      const { data } = await Axios.get(`/Exercise/get/${id}`);
      set({ isLoading: false, Exercise: data });
    } catch (error) {
      set({ isLoading: false });
      toast.error(error?.response?.data?.message);
    }
  },
 get: async () => {
  try {
    set({ isLoading: true });
    const { data } = await Axios.get("/Exercise/get");
    set({ isLoading: false, Exercise: data.exercises }); // assuming the array is inside `data.exercises`
    toast.success("exercises fetched successfully");
  } catch (error) {
    set({ isLoading: false });
    toast.error(error?.response?.data?.message || "Failed to fetch exercises");
  }
},
}));