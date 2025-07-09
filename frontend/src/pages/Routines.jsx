import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRoutineStore } from '../store/useRoutineStore';

const RoutineDetailPage = () => {
  const { id } = useParams();
  const {
    getById,
    selectedRoutine: routine,
    markAsComplete,
    isLoading,
    error,
  } = useRoutineStore();

  useEffect(() => {
    if (id) {
      getById(id);
    }
  }, [id, getById]);

  if (isLoading || !routine) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </button>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              routine.isCompleted
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {routine.isCompleted ? 'Completed' : 'In Progress'}
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {routine.name}
                </h1>
                <p className="text-gray-600 mb-6">{routine.description}</p>
              </div>
              <div className="text-sm text-gray-500">
                Created: {new Date(routine.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Exercises
              </h2>
              {routine.exercises && routine.exercises.length > 0 ? (
                <ul className="space-y-3">
                  {routine.exercises.map((exercise, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{exercise.name}</span>
                        <span className="text-sm text-gray-500">
                          {exercise.sets} sets × {exercise.reps} reps
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded">
                  No exercises added to this routine yet.
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 sm:px-8 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Last updated: {new Date(routine.updatedAt).toLocaleString()}
            </div>
            <div className="space-x-3">
              {!routine.isCompleted && (
                <button
                  onClick={() => markAsComplete(routine._id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  ✅ Mark as Complete
                </button>
              )}
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Edit Routine
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineDetailPage;
