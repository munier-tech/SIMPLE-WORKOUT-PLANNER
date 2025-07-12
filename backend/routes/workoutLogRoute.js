import express from "express";
import { addExerciseToWorkoutLog, CreateWorkoutLog, deleteWorkoutLog, getAllWorkoutLogs, getWorkoutLogById, getWorkoutLogsByDate, markWorkoutLogAsCompleted, removeExerciseFromWorkoutLog, updateWorkoutLog } from "../controllers/WorkoutLog.js";
import { protectedRoute } from "../middlewares/authorization.js";
const router = express.Router();




router.post("/create", protectedRoute  ,  CreateWorkoutLog);
router.get("/getAll", protectedRoute  ,  getAllWorkoutLogs);
router.get("/get/:workoutId", protectedRoute  ,  getWorkoutLogById);
router.patch("/update/:workoutId", protectedRoute  ,  updateWorkoutLog);
router.delete("/delete/:workoutId", protectedRoute  ,  deleteWorkoutLog);
router.post("/addExercise/:workoutId/:exerciseId", protectedRoute  ,  addExerciseToWorkoutLog);
router.post("/removeExercise/:workoutId/:exerciseId", protectedRoute  ,  removeExerciseFromWorkoutLog);
router.put("/complete/:workoutId", protectedRoute  ,  markWorkoutLogAsCompleted);
router.get("/byDate/:date", protectedRoute  ,  getWorkoutLogsByDate);



export default router