// store/useWorkoutStore.js
import { create } from 'zustand';
import axios from '../lib/axios.js';
import toast from 'react-hot-toast';

const useWorkoutStore = create((set, get) => ({
  workoutLogs: [],
  isLoading: false,
  error: null,

 createWorkoutLog: async ({ routines, note }) => {
  try {
    set({ isLoading: true });

    const res = await axios.post('/WorkoutLog/create', {
      routines: routines.map((id) => ({ routine: id })), // ✅ correct formatting here
      note,
      isCompleted: false,
    });

    toast.success(res.data.message);
    set((state) => ({
      workoutLogs: [...state.workoutLogs, res.data.workoutLog],
      isLoading: false,
    }));
  } catch (err) {
    toast.error(err?.response?.data?.message || 'Failed to create workout log');
    set({ isLoading: false, error: err.message });
  }
},

 getAllWorkoutLogs: async () => {
    try {
      set({ isLoading: true });
      const res = await axios.get('/workoutLog/getAll');
      set({ workoutLogs: res.data.workoutLogs, isLoading: false });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch logs");
      set({ isLoading: false, error: err.message });
    }
  },

  updateWorkoutLog: async (id, updatedFields) => {
    try {
      const res = await axios.patch(`/WorkoutLog/update/${id}`, updatedFields);
      set((state) => ({
        workoutLogs: state.workoutLogs.map((log) =>
          log._id === id ? res.data.workoutLog : log
        ),
      }));
      toast.success("Workout log updated.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  },

  deleteWorkoutLog: async (id) => {
    try {
      await axios.delete(`/WorkoutLog/delete/${id}`);
      set((state) => ({
        workoutLogs: state.workoutLogs.filter((log) => log._id !== id),
      }));
      toast.success("Workout log deleted.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  },


}));

export default useWorkoutStore;
