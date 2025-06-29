import express from "express";
import { addExerciseToRoutine, CreateRoutine, deleteRoutine, getAllRoutines, getRoutineById, GetRoutines, markRoutineAsCompleted, markRoutineAsInComplete, removeExerciseFromRoutine, updateRoutine } from "../controllers/RoutineController.js";
const router = express.Router();
import { protectedRoute } from "../middlewares/authorization.js";


router.post("/create", protectedRoute , CreateRoutine);
router.get("/get", protectedRoute , GetRoutines);
router.get("/getAll", protectedRoute , getAllRoutines);
router.get("/get/:routineId", protectedRoute , getRoutineById);
router.patch("/update/:routineId", protectedRoute , updateRoutine);
router.delete("/delete/:routineId", protectedRoute , deleteRoutine);
router.patch("/Complete/:routineId", protectedRoute , markRoutineAsCompleted);
router.patch("/inComplete/:routineId", protectedRoute , markRoutineAsInComplete);
router.patch("/add/:routineId/:exerciseId", protectedRoute,  addExerciseToRoutine);
router.delete("/remove/:routineId/:exerciseId", protectedRoute,  removeExerciseFromRoutine);



export default router;