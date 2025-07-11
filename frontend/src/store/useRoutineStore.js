import { create } from "zustand";
import axios from "../lib/axios.js"; 
import { toast } from "react-hot-toast"; // or your toast lib

export const useRoutineStore = create((set) => ({
  isLoading: false,
  routine: [],

  create: async (name, description, isCompleted) => {
    try {
      set({ isLoading: true });

      const { data } = await axios.post('/Routine/create', {
        name,
        description,
        isCompleted,
      });

      set({ isLoading: false, routine: data.routines });
      toast.success("Routine created successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      set({ isLoading: false });
    }
  },
  get : async () => {
    try {
      set({isLoading : true});

      const { data } = await axios.get('/Routine/get');
      set({ isLoading: false, routine: data.routines });

      toast.success("Routines fetched successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      set({ isLoading: false });
    }
  },
    getById: async (id) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`/Routine/get/${id}`);
      set({ selectedRoutine: res.data.routine, error: null });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch routine");
      set({ error: 'Failed to fetch routine', isLoading: false });
    }
  },
  addExercise : async (routineId , exerciseId) => {
    set({ isLoading: true });

    try {
      const res = await axios.post(`/Routine/add/:${routineId}/:${exerciseId}`, {
        routineId: selectedRoutine.id,
        exercise: newExercise,
      });
      set({ selectedRoutine: res.data.routine, error: null });
    } catch (err) {
     toast.error(err?.response?.data?.message || "Failed to add exercise");
      set({ error: 'Failed to add exercise', isLoading: false });
    } 
  },
  removeExercise: async (routineId, exerciseId) => {
    set({ isLoading: true });
     console.log("Routine ID:", routineId);
  console.log("Exercise ID:", exerciseId);

    try {
      const res = await axios.delete(`/Routine/remove/${routineId}/${exerciseId}`);
      set({ selectedRoutine: res.data.routine, error: null });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to remove exercise");
      set({ error: 'Failed to remove exercise', isLoading: false });
    }
  },
  update: async (id, name, description, isCompleted) => {
    try {
      set({ isLoading: true });

      const { data } = await axios.patch(`/Routine/update/${id}`, {
        name,
        description,
        isCompleted,
      });

      set({ isLoading: false, routine: data.routines });
      toast.success("Routine updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      set({ isLoading: false });
    }
  },
  delete: async (id) => {
    try {
      set({ isLoading: true });

      await axios.delete(`/Routine/delete/${id}`);

      set((state) => ({
        isLoading: false,
        routine: state.routine.filter((r) => r.id !== id),
      }));
      toast.success("Routine deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      set({ isLoading: false });
    }
  },
  markAsComplete : async (id) => {
    set({ isLoading: true });
    try {
      const res = await axios.patch(`/Routine/complete/${id}`);
      set({ selectedRoutine: res.data.routine, error: null });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to mark routine as complete");
      set({ error: 'Failed to mark routine as complete', isLoading: false });
    }
  }
}));
