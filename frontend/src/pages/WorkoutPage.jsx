// pages/WorkoutPage.jsx
import React, { useEffect, useState } from 'react';
import { useRoutineStore } from '../store/useRoutineStore';
import useWorkoutStore from '../store/useWorkoutStore';
import { toast } from 'react-hot-toast';

const WorkoutPage = () => {
  const { routine, get } = useRoutineStore();
  const { createWorkoutLog, isLoading } = useWorkoutStore();

  const [selectedRoutines, setSelectedRoutines] = useState([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    get();
  }, [get]);

  const handleToggleRoutine = (id) => {
    setSelectedRoutines((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!selectedRoutines.length) {
      toast.error('Please select at least one routine.');
      return;
    }

    try {
      await createWorkoutLog({
        routines: selectedRoutines, // ✅ FIXED: send only IDs
        note,
        isCompleted: false,
      });

      setSelectedRoutines([]);
      setNote('');
      toast.success('Workout logged successfully!');
    } catch (error) {
      toast.error('Failed to log workout. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Log Your Workout</h1>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Workout Notes (optional)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="How did your workout go? Any observations?"
          ></textarea>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Routines</h2>
          {routine && routine.length > 0 ? (
            <ul className="space-y-3">
              {routine.map((routineItem) => (
                <li
                  key={routineItem._id}
                  className={`border rounded-lg p-4 flex justify-between items-center transition-all 
                    ${selectedRoutines.includes(routineItem._id) ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'}`}
                >
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{routineItem.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{routineItem.description}</p>
                  </div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedRoutines.includes(routineItem._id)}
                      onChange={() => handleToggleRoutine(routineItem._id)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-700">No routines available. Please create one first.</p>
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading || !selectedRoutines.length}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors
            ${isLoading ? 'bg-blue-400 cursor-not-allowed' :
              selectedRoutines.length ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : 'Save Workout Log'}
        </button>
      </div>
    </div>
  );
};

export default WorkoutPage;
