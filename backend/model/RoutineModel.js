import mongoose from "mongoose";



const RoutineSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  exercises: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
  }],
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });


const Routine = mongoose.model('Routine', RoutineSchema);


export default Routine;