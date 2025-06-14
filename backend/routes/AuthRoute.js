import express from "express"
import { SignIn, SignUp } from "../controllers/AuthController.js";
const router = express.Router();




router.post("/signUp", SignUp)
router.post("/login", SignIn)




export default router;