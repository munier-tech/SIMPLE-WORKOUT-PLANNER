import Excercise from "../model/exerciseModel.js";
import dayjs from "dayjs";

export const CreateExercise = async (req, res) => {
  try {
    const { name, description, duration , sets , reps , weight, isCompleted , image} = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Exercise name is required" });
    }

    const durationTime = parseInt(duration, 10);
    if (isNaN(durationTime) || durationTime <= 0) {
      return res.status(400).json({ message: "Invalid duration value. It must be a positive number." });
    }

   const setsNumber = parseInt(sets, 10);
   if (isNaN(setsNumber) || setsNumber <= 0) {
    return res.status(400).json({ message: "Invalid sets value. It must be a positive number." });
   }

   const repsNumber = parseInt(reps, 10);
   if (isNaN(repsNumber) || repsNumber <= 0) {
    return res.status(400).json({ message: "Invalid sets value. It must be a positive number." });
   }
   
   
       let cloudinaryResponse = null;
   
       if (image) {
          cloudinaryResponse = await cloudinary.uploader.upload( image , { folder : "exercises" })
       }

    const newExercise = new Excercise({
      name: name.trim(),
      user: req.user._id, // must be set by auth middleware
      description: description ? description.trim() : "",
      category: "Strength", // Default category
      duration: durationTime,
      sets: setsNumber,
      reps: repsNumber,
      image : cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "https://example.com/default-exercise-image.jpg", // Placeholder image URL
      weight: weight ? parseInt(weight) : 0, 
      isCompleted: isCompleted ? isCompleted : false, 
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
    console.log('req.user:', req.user);
    const user   = req.user._id
    console.log('Finding exercises for user:', user);
    const MyExercises = await Excercise.find({ user }).sort({ date: -1 }).populate("user", "username profilePicture");
    console.log('Exercises found:', MyExercises);
    if (MyExercises.length === 0) {
      console.log('No exercises found');
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


export const getCompletedExercises = async ( req , res ) => {
  try {
    const completedExercises = await Excercise.find({ isCompleted: true }).sort({ date : -1}).populate("user", "username profilePicture").lean();
    
    if (!completedExercises || completedExercises.length === 0) {
      return res.status(404).json({ message: "No completed exercises found" });
    }

    res.status(200).json({
      message: "Completed exercises retrieved successfully",
      exercises: completedExercises,
    });
  } catch (error) {
    console.error("Error in getCompletedExercises controller:", error);
    res.status(500).json({ message: error.message });
  }
}

export const getExerciseById = async ( req, res ) => {
try {
  console.log("exercise id:", req.params.id);
  const { id } =  req.params;

  const findExercise = await Excercise.findById(id).populate("user", "username profilePicture");

  if (!findExercise) {
    return res.status(404).json({ message: "specific Exercise not found" });
  }


  res.status(200).json({ message : "Exercise retrieved successfully" , findExercise})
} catch (error) {
  console.error("Error in getExerciseById controller:", error);
  return res.status(500).json({ message: error.message });
}
}

export const UpdateExercise = async (req, res) => {
 try {

  const id = req.params.id;

  const { name, description, duration, sets, reps, weight, isCompleted } = req.body;

  const Exercise = await Excercise.findById(id);

  if (!Exercise) {
    return res.status(404).json({ message: "Exercise not found" });
  }

  Exercise.name = name || Exercise.name;
  Exercise.description = description || Exercise.description;
  Exercise.duration = duration || Exercise.duration;
  Exercise.sets = sets || Exercise.sets;
  Exercise.reps = reps || Exercise.reps;
  Exercise.weight = weight || Exercise.weight;
  Exercise.isCompleted = isCompleted || Exercise.isCompleted;


  await Exercise.save();
  
  res.status(200).json({
    message: "Exercise updated successfully",
    exercise: Exercise,
  });
 } catch (error) {
  console.error("Error in UpdateExercise controller:", error);
  return res.status(500).json({ message: error.message });
 }
}


export const DeleteExercise = async (req, res) => {
  try {
    const { id } = req.params;

    const exercise = await Excercise.findById(id);

    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    if (exercise.image) {
       const publicId = exercise.image.split('/').pop().split('.')[0]; // Extract public ID from URL
       try {
        await cloudinary.uploader.destroy(`exercises/${publicId}`)
        console.log("Image deleted from Cloudinary successfully");
       } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
       }
    }

    await Excercise.findByIdAndDelete(id);

    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    console.error("Error in DeleteExercise controller:", error);
    return res.status(500).json({ message: error.message });
  }
}