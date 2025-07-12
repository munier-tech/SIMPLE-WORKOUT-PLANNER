import express from "express"; 
import dotenv from 'dotenv';
import { connectDB } from "./lib/connectDB.js";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/AuthRoute.js";
import ExerciseRouter from "./routes/ExerciseRoute.js";
import RoutineRouter from "./routes/RoutineRoute.js";
import cors from "cors"
import workoutLog from "./routes/workoutLogRoute.js";
import path from "path"

const app = express();
dotenv.config();

const PORT = process.env.PORT || 9000;

const __dirname = path.resolve()

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))


app.use("/api/auth", AuthRouter);
app.use("/api/Exercise", ExerciseRouter);
app.use("/api/Routine", RoutineRouter);
app.use("/api/workoutLog", workoutLog);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  connectDB()
});



