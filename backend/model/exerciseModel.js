import mongoose from "mongoose";


const excerciseSchema = new mongoose.Schema({
  name : {
    type: String,
    required : true
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required: true
  },
  description : {
    type : String,
  },
  category : {
    type : String,
    enum: ["Strength", "Cardio", "Flexibility", "Balance"],
    default: "Strength",
    required: true
  },
  duration : {
    type : Number,
    required: true
  },
  sets : {
    type : Number,
    required: true,
    default : 1
  },
  reps : {
    type : Number,
    required: true,
    default : 10
  },
  weight : {
    type : Number,
    required: true,
    default : 0
  },
  image : {
    type : String,
    default: "https://example.com/default-exercise-image.jpg" // Placeholder image URL
  },
  isCompleted : {
    type : Boolean,
    default: false
  },
   date : {
    type : Date,
    default: Date.now
   },
   routines : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Routine"
   }
}, {timestamps : true});




const Excercise = mongoose.model("Exercise", excerciseSchema);


export default Excercise;