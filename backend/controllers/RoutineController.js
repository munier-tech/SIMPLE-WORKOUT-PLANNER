import Routine from "../model/RoutineModel.js";
import Excercise from "../model/exerciseModel.js";


export const CreateRoutine = async (req, res) => {
  try {
    const { name , description, isCompleted } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }

    const newRoutine =  new Routine({
      name,
      description,
      user: req.user._id, // Assuming req.user is set by a middleware
      isCompleted: isCompleted || false,
    });

    await newRoutine.save();

    res.status(201).json({
      message: "Routine created successfully",
      routine: newRoutine,
    });
  } catch (error) {
    console.error("Error in CreateRoutine controller:", error);
    return res.status(500).json({ message: error.message });
  }
}


export const GetRoutines = async (req, res) => {
  try {
    const routines = await Routine.find({ user: req.user._id })
      .populate("exercises", "name description").populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Routines fetched successfully",
      routines,
    });
  } catch (error) {
    console.error("Error in GetRoutines controller:", error);
    return res.status(500).json({ message: error.message });
  }
}


export const getAllRoutines = async (req, res) => {
  try {
    const allRoutines = await Routine.find().populate("exercises", "name description").populate("user" , "name email");

    res.status(200).json({
      message: "All routines fetched successfully",
      routines: allRoutines,
    });
  } catch (error) {
    console.error("Error in getAllRoutines controller:", error);
    return res.status(500).json({ message: error.message });
  }
}

export const getRoutineById = async (req, res) => {
 try {
  const { routineId } = req.params;

  const getRoutines = await Routine.findById(routineId)

  if (!getRoutines || getRoutines.length === 0) {
    return res.status(404).json({ message: "Routine not found" });
  }

  res.status(200).json({ message : "Routine fetched successfully", routine: getRoutines });
 } catch (error) {
  console.error("Error in getRoutineById controller:", error);
  return res.status(500).json({ message: error.message });
 }
}


export const updateRoutine = async ( req, res ) => {
  try {
    const { routineId } = req.params;

    const { name , description, exercises, isCompleted } = req.body;


    const routine = await Routine.findById(routineId);

    if (!routine) {
      return res.status(404).json({ message: "Routine not found." });
    }

    if (!name) {
      return res.status(400).json({ message: "Name  are required." });
    }

    routine.name = name || routine.name;
    routine.description = description || routine.description;
    routine.exercises = exercises || routine.exercises;
    routine.isCompleted = isCompleted || routine.isCompleted;

    await routine.save();


    res.status(200).json({
      message: "Routine updated successfully",
      routine,
    });
  
  } catch (error) {
    console.error("Error in updateRoutine controller:", error);
    return res.status(500).json({ message: error.message });
  }
}


export const deleteRoutine = async (req, res) => {
  try {

    const { routineId } = req.params;

    const routine = await Routine.findById(routineId);

    if (!routine) {
      return res.status(404).json({ message: "Routine not found." });
    }
    
    await Routine.findByIdAndDelete(routineId);

    res.status(200).json({ message: "Routine deleted successfully." });
  } catch (error) {
    console.error("Error in deleteRoutine controller:", error);
    return res.status(500).json({ message: error.message });
  }
}
 

export const markRoutineAsCompleted = async ( req, res ) => {
  try {

    const { routineId } = req.params;
   

    const updateRoutine = await Routine.findByIdAndUpdate(routineId, {
      isCompleted: true,
      new: true,
    })

    
    if (!updateRoutine) {
      return res.status(404).json({ message: "Routine not found." });
    }
    res.status(200).json({
      message: "Routine marked as completed successfully",
      routine: updateRoutine,
    });
  } catch (error) {
    console.error("Error in markRoutineAsCompleted controller:", error);
    return res.status(500).json({ message: error.message });
  }
}

export const markRoutineAsInComplete = async (  req, res ) => {
  try {

    const { routineId } = req.params;

    const updateRoutine = await Routine.findByIdAndUpdate(routineId, {
     isCompleted: false,
      new: true, 
    })

    
    if (!updateRoutine) {
      return res.status(404).json({ message: "Routine not found." });
    }
    
    await updateRoutine.save();

    res.status(200).json({
      message: "Routine marked as incomplete successfully",
      routine: updateRoutine,
    });
  } catch (error) {
    console.error("Error in markRoutineAsInComplete controller:", error);
    return res.status(500).json({ message: error.message });
  }
}

export const addExerciseToRoutine = async (req, res) => {
  try {
    const { routineId } = req.params;
    const { exerciseId } = req.params;

    const routine = await Routine.findById(routineId);

    if (!routine) {
       return res.status(404).json({ message: "Routine not found." });
    }


    const updatedRoutine = await Routine.findByIdAndUpdate(routineId, 
     { 
      $push : { exercises: exerciseId } 
    },
      { new : true }
    ).populate("exercises", "name description").populate("user", "name email");

    if (!updatedRoutine) {
      return res.status(404).json({ message: "Routine not found." });
    }


    res.status(200).json({
      message: "Exercise added to routine successfully",
      routine: updatedRoutine,
    });
    
  } catch (error) {
    console.error("Error in addExerciseToRoutine controller:", error);
    return res.status(500).json({ message: error.message });
  }
}


export const removeExerciseFromRoutine = async (req, res) => {
  try {
    const { routineId, exerciseId } = req.params;

    const routine  = await Excercise.findById(routineId);
  

    const updateRoutine = await Routine.findByIdAndUpdate(routineId,{
      $pull : { exercises: exerciseId },
    }, { new: true }
    ).populate("exercises", "name description").populate("user", "name email");

    if (!updateRoutine) {
      return res.status(404).json({ message: "there is no Routine to update." });
    }

    res.status(200).json({
      message: "Exercise removed from routine successfully",
      routine: updateRoutine,
    });
    
  } catch (error) {
    console.error("Error in removeExerciseFromRoutine controller:", error);
    return res.status(500).json({ message: error.message });
  }
}