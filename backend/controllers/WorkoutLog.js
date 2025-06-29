import dayjs from "dayjs";
import workoutLog from "../model/workoiutLogModel.js";


export const CreateWorkoutLog = async ( req, res ) => {
  try {
    const { routines, exercises, isCompleted , note } = req.body;

    if (!routines || !exercises || exercises.length === 0) {
      return res.status(400).json({ message: "Routine and exercises are required." });
    }

    const newWorkoutLog = new workoutLog({
      user : req.user._id,
      routines: routines.map(routine => ({ routine })),
      exercises,
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

    const { workoutId , exerciseId } = req.params;
    
    
  } catch (error) {
    
  }
}