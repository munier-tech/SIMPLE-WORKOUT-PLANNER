import mongoose from "mongoose";

const workoutLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    routines: [
      {
      routine : {
      type: String,
      ref: "Routine",
      required: true,
    }
  }
  ],
    exercises: [
      {
        exercise: {
          type: String,
          ref: "Exercise",
          required: true,
        },
        sets: { type: Number, default: 0 },
        reps: { type: Number, default: 0 },
        weight: { type: Number, default: 0 }, // in kg or lbs
        completed: { type: Boolean, default: false },
        notes: { type: String },
      },
    ],
    date: {
      type: Date,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number, // in minutes
    },
    note : {
      type : String,
      default: "No notes provided",
    },
  },
  { timestamps: true }
);

const workoutLog =  mongoose.model("WorkoutLog", workoutLogSchema);

export default workoutLog
