import express from "express"
import { CreateExercise, DeleteExercise, getCompletedExercises, getExerciseById, GetExercises, GetMyExercises, UpdateExercise } from "../controllers/ExerciseController.js";
import { protectedRoute } from "../middlewares/authorization.js";
const router = express.Router();



router.post("/create", protectedRoute,  CreateExercise);
router.get("/all", protectedRoute,  GetExercises);
router.get("/get", protectedRoute,  GetMyExercises);
router.get("/get/:id", protectedRoute,  getExerciseById);
router.patch("/update/:id", protectedRoute,  UpdateExercise);
router.delete("/delete/:id", protectedRoute,  DeleteExercise);
router.get("/isCompleted", protectedRoute,  getCompletedExercises);


export default router