import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  username : {
    type: String,
    required: true,
    trim: true, 
  },
  password : {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters long"],
  },
  email : {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  CreatedRoutines : {
    type: mongoose.Schema.Types.ObjectId,
    ref : "Routine",
  },
  CompletedWorkOut : {
    type: mongoose.Schema.Types.ObjectId,
    ref : "WorkoutLog",
  },
  savedRoutines: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Routine",
  }],
  role : {
    type : String,
    enum: ["user", "admin"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})




