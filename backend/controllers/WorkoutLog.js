import dayjs from "dayjs";
import workoutLog from "../model/workoiutLogModel.js";
import Excercise from "../model/exerciseModel.js";
import mongoose from "mongoose";


export const CreateWorkoutLog = async ( req, res ) => {
  try {
    const { routines, isCompleted , note } = req.body;

    if (!routines) {
      return res.status(400).json({ message: "Routine are required." });
    }

    const newWorkoutLog = new workoutLog({
      user : req.user._id,
      routines: routines.map(routine => ({ routine })),
      isCompleted,
      note: note || "No notes provided",
      date : dayjs().startOf('day').toDate(), 
    })

    await newWorkoutLog.save();

    res.status(201).json({
      message: "Workout Log created successfully",
      workoutLog: newWorkoutLog,
    });
  } catch (error) {
   console.error("Error in CreateWorkoutLog controller:", error);
    return res.status(500).json({ message: error.message }); 
  }
}

export const getAllWorkoutLogs =  async ( req, res ) => {
  try {


    const WorkoutLogs = await workoutLog.find()

    if (!WorkoutLogs || WorkoutLogs.length === 0) {
      return res.status(404).json({ message: "No workout logs found" });
    }
    

    res.status(200).json({
      message: "Workout logs retrieved successfully",
      workoutLogs: WorkoutLogs,
      date
    });
  } catch (error) {
    console.error("Error in getAllWorkoutLogs controller:", error);
    return res.status(500).json({ message: error.message });
  }
}


export const getWorkoutLogById = async ( req, res ) => {
  try {

    const {workoutId} = req.params

    const workout = await workoutLog.findById(workoutId)

    if (!workout || workout.lenght === 0) {
      return res.status(404).json({ message: "Workout log not found" });
    }

    res.status(200).json({
      message: "Workout log fetched successfully",
      workoutLog: workout,
    });
    
  } catch (error) {
    console.error("Error in getWorkoutLogById controller:", error);
    return res.status(500).json({ message: error.message });
  }
}



export const updateWorkoutLog = async (req, res) => {
  try {
    const { workoutId } = req.params;

    const workout = await workoutLog.findById(workoutId);
    if (!workout) {
      return res.status(404).json({ message: "Workout log not found" });
    }

    const updatedFields = {
      routines: req.body.routines || workout.routines,
      exercises: req.body.exercises || workout.exercises,
      isCompleted: req.body.isCompleted ?? workout.isCompleted,
      note: req.body.note || workout.note,
    };

    const updatedWorkout = await workoutLog.findByIdAndUpdate(
      workoutId,
      updatedFields,
      { new: true }
    );

    res.status(200).json({
      message: "Workout log updated successfully",
      workoutLog: updatedWorkout,
    });
  } catch (error) {
    console.error("Error in updateWorkoutLog controller:", error);
    return res.status(500).json({ message: error.message });
  }
};


export const deleteWorkoutLog = async (req, res ) => {
  try {

    const { workoutId } = req.params;

    const deletedWorkout = await workoutLog.findByIdAndDelete(workoutId);

    if (!deletedWorkout) {
      return res.status(404).json({ message: "Workout log not found" });
    }

    res.status(200).json({
      message: "Workout log deleted successfully",
      workoutLog: deletedWorkout,
    });
    
  } catch (error) {
    console.error("Error in deleteWorkoutLog controller:", error);
    return res.status(500).json({ message: error.message });
  }
}





export const addExerciseToWorkoutLog = async (req, res) => {
  try {
    const { workoutId, exerciseId } = req.params;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(workoutId) || !mongoose.Types.ObjectId.isValid(exerciseId)) {
      return res.status(400).json({ message: "Invalid workout or exercise ID." });
    }

    // Make sure the exercise exists
    const exercise = await Excercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found." });
    }

    // Create exercise subdocument to push
    const exerciseEntry = {
      exercise: exerciseId,
      sets: 0,
      reps: 0,
      weight: 0,
      completed: false,
      notes: "",
    };

    const updatedWorkoutLog = await workoutLog.findByIdAndUpdate(
      workoutId,
      {
        $push: { exercises: exerciseEntry },
      },
      { new: true }
    )
      .populate("exercises.exercise", "name description sets reps weight isCompleted notes")
      .populate("user", "name email");

    if (!updatedWorkoutLog) {
      return res.status(404).json({ message: "Workout log not found" });
    }

    res.status(200).json({
      message: "Exercise added to workout log successfully",
      workoutLog: updatedWorkoutLog,
    });
  } catch (error) {
    console.error("Error in addExerciseToWorkoutLog controller:", error);
    res.status(500).json({ message: error.message });
  }
};


export const removeExerciseFromWorkoutLog = async (req, res) => {
  try {

    const { workoutId , exerciseId } = req.params;


    const excercises = await Excercise.findById(exerciseId);

    if (!excercises || excercises.length === 0) {
      return res.status(404).json({ message: "Exercise not found" });
    }

     const exerciseEntry = {
      exercise: exerciseId,
      sets: 0,
      reps: 0,
      weight: 0,
      completed: false,
      notes: "",
    };

    const removeExerciseFromWorkout = await workoutLog.findByIdAndUpdate(
      workoutId,
      {
        $pull: {
          exercises: exerciseEntry,
        }
      },
      { new: true }
    ).populate("exercises", "name description sets reps weight isCompleted notes").populate("user", "name email");

    if (!removeExerciseFromWorkout) {
      return res.status(404).json({ message: "Workout log not found" });
    }


    res.status(200).json({
      message: "Exercise removed from workout log successfully",
      workoutLog: removeExerciseFromWorkout,
    });
    
  } catch (error) {
    console.error("Error in removeExerciseToWorkoutLog controller:", error);
    return res.status(500).json({ message: error.message });
  }

}


export const markWorkoutLogAsCompleted = async (req, res) => {
  try {

    const {workoutId} = req.params

    const workout = await workoutLog.findById(workoutId);
    
    
    await workoutLog.findByIdAndUpdate(workoutId, { isCompleted: true }, { new: true })
    
    if (!workout) {
      return res.status(404).json({ message: "Workout log not found" });
    }
    
    workout.isCompleted = true;
    await workout.save();


    res.status(200).json({
      message: "Workout log marked as completed",
      workoutLog: workout,
    });
  } catch (error) {
    console.error("Error in markWorkoutLogAsCompleted controller:", error);
    return res.status(500).json({ message: error.message });
  }
}

export const getWorkoutLogsByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const startDate = dayjs(date).startOf("day").toDate();
    const endDate = dayjs(date).endOf("day").toDate();

    const logs = await workoutLog.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .populate("exercises.exercise", "name description")
      .populate("user", "name email");

    if (!logs || logs.length === 0) {
      return res.status(404).json({ message: "No workout logs found for this date" });
    }

    res.status(200).json({
      message: "Workout logs retrieved successfully",
      workoutLogs: logs,
    });

  } catch (error) {
    console.error("Error in getWorkoutLogsByDate controller:", error);
    return res.status(500).json({ message: error.message });
  }
};