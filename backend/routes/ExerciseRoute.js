import express from "express"
import { CreateExercise, GetExercises, GetMyExercises } from "../controllers/ExerciseController.js";
import { protectedRoute } from "../middlewares/authorization.js";
const router = express.Router();



router.post("/create", protectedRoute,  CreateExercise);
router.get("/all", protectedRoute,  GetExercises);
router.get("/get/:user", protectedRoute,  GetMyExercises);


export default router