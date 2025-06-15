import Excercise from "../model/exerciseModel.js";
import dayjs from "dayjs";

export const CreateExercise = async (req, res) => {
  try {
    const { name, description, duration } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Exercise name is required" });
    }

    const durationTime = parseInt(duration, 10);
    if (isNaN(durationTime) || durationTime <= 0) {
      return res.status(400).json({ message: "Invalid duration value. It must be a positive number." });
    }


    const newExercise = new Excercise({
      name: name.trim(),
      user: req.user._id, // must be set by auth middleware
      description: description ? description.trim() : "",
      category: "Strength", // Default category
      duration: durationTime,
      sets: 1,
      reps: 10,
      weight: 0,
      isCompleted: false,
      date: dayjs().startOf('day').toDate()
    });

    await newExercise.save();

    res.status(201).json({
      message: "Exercise created successfully",
      exercise: newExercise,
    });
  } catch (error) {
    console.error("Error in CreateExercise controller:", error);
    return res.status(500).json({ message: error.message });
  }
};



export const GetExercises = async (req, res ) => {
 try {
   const user = req.user._id; 
   const Exercise  = await Excercise.find({ user }).sort({ date : -1 }).populate("user", "username profilePicture");
 
   if (!Exercise || Exercise.length === 0) {
     return res.status(404).json({ message: "No exercises found" });
   }
 
 
   res.status(200).json({
     message: "Exercises retrieved successfully",
     exercises: Exercise,
   });
 } catch (error) {
    console.error("Error in GetExercises controller:", error);
    return res.status(500).json({ message: error.message });
 }
}


export const GetMyExercises = async ( req, res ) => {
  try {

    const { user }  = req.user

    const MyExercises = await Excercise.find({ user }).sort({ date: -1 }).populate("user", "username profilePicture");
    
    if (!MyExercises || MyExercises.length === 0) {
      return res.status(404).json({ message: "No exercises found for this user" });
    }

    res.status(200).json({
      message: "My exercises retrieved successfully",
      exercises: MyExercises,
    });
  } catch (error) {
    console.error("Error in GetMyExercises controller:", error);
    return res.status(500).json({ message: error.message });
  }
}