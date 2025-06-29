import express from "express";
import { CreateWorkoutLog, deleteWorkoutLog, getAllWorkoutLogs, getWorkoutLogById, updateWorkoutLog } from "../controllers/WorkoutLog.js";
import { protectedRoute } from "../middlewares/authorization.js";
const router = express.Router();




router.post("/create", protectedRoute  ,  CreateWorkoutLog);
router.get("/getAll", protectedRoute  ,  getAllWorkoutLogs);
router.get("/get/:workoutId", protectedRoute  ,  getWorkoutLogById);
router.patch("/update/:workoutId", protectedRoute  ,  updateWorkoutLog);
router.delete("/delete/:workoutId", protectedRoute  ,  deleteWorkoutLog);



export default router