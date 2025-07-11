import { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { useRoutineStore } from '../store/useRoutineStore';
import { useExerciseStore } from '../store/useExerciseStore';

const RoutineDetailPage = () => {
  const { id } = useParams();

  const {
    getById,
    selectedRoutine: routine,
    markAsComplete,
    update,
    isLoading,
    error,
  } = useRoutineStore();

  const {
    create: createExercise,
    delete: deleteExercise,
  } = useExerciseStore();

  useEffect(() => {
    if (id) getById(id);
  }, [id, getById]);

  const [newEx, setNewEx] = useState({
    name: '',
    description: '',
    duration: '',
    sets: '',
    reps: '',
    weight: '',
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({ name: '', description: '', isCompleted: false });

  const handleAddExercise = async (e) => {
    e.preventDefault();
    try {
      await createExercise(
        newEx.name,
        newEx.description,
        newEx.duration,
        newEx.sets,
        newEx.reps,
        newEx.weight
      );
      setNewEx({ name: '', description: '', duration: '', sets: '', reps: '', weight: '' });
      await getById(id); // Refresh routine
    } catch (err) {
      console.error('Error creating exercise', err);
    }
  };

  const handleRemoveExercise = async (exerciseId) => {
    try {
      await deleteExercise(exerciseId);
      await getById(id); // Refresh routine
    } catch (err) {
      console.error('Error removing exercise', err);
    }
  };

  const openEdit = () => {
    setEditData({
      name: routine.name,
      description: routine.description,
      isCompleted: routine.isCompleted,
    });
    setIsEditOpen(true);
  };

  const handleRoutineUpdate = async (e) => {
    e.preventDefault();
    await update(routine._id, editData.name, editData.description, editData.isCompleted);
    setIsEditOpen(false);
  };

  if (isLoading || !routine) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => window.history.back()} className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Back</span>
          </button>
          <span className={`px-3 py-1 text-xs rounded-full font-semibold ${routine.isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {routine.isCompleted ? 'Completed' : 'In Progress'}
          </span>
        </div>

        {/* Card */}
        <div className="bg-white shadow rounded-xl overflow-hidden">
          {/* Card header */}
          <div className="px-6 py-6 border-b border-gray-200 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{routine.name}</h1>
              <p className="text-gray-600 mt-1">{routine.description}</p>
            </div>
            <div className="text-sm text-gray-500">Created: {new Date(routine.createdAt).toLocaleDateString()}</div>
          </div>

          {/* Add‑exercise form */}
          <form onSubmit={handleAddExercise} className="px-6 pt-6 grid sm:grid-cols-4 gap-4">
            <input
              className="border rounded px-2 py-1 col-span-2 text-black"
              placeholder="Exercise name"
              value={newEx.name}
              onChange={(e) => setNewEx({ ...newEx, name: e.target.value })}
              required
            />
            <input
              type="number"
              className="border rounded px-2 py-1 text-black"
              placeholder="Sets"
              value={newEx.sets}
              onChange={(e) => setNewEx({ ...newEx, sets: e.target.value })}
              required
            />
            <input
              type="number"
              className="border rounded px-2 py-1 text-black"
              placeholder="Reps"
              value={newEx.reps}
              onChange={(e) => setNewEx({ ...newEx, reps: e.target.value })}
              required
            />
            <input
              type="number"
              className="border rounded px-2 py-1 text-black"
              placeholder="Weight (kg)"
              value={newEx.weight}
              onChange={(e) => setNewEx({ ...newEx, weight: e.target.value })}
            />
            <input
              className="border rounded px-2 py-1 col-span-2 text-black"
              placeholder="Description"
              value={newEx.description}
              onChange={(e) => setNewEx({ ...newEx, description: e.target.value })}
            />
            <input
              type="number"
              className="border rounded px-2 py-1 text-black"
              placeholder="Duration"
              value={newEx.duration}
              onChange={(e) => setNewEx({ ...newEx, duration: e.target.value })}
            />
            <button type="submit" className="sm:col-span-4 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
              + Add Exercise
            </button>
          </form>

          {/* Exercise list */}
          <div className="px-6 pb-6">
            <h2 className="font-semibold text-gray-900 mt-6 mb-4">Exercises ({routine.exercises.length})</h2>
            {routine.exercises.length ? (
              <ul className="space-y-3">
                {routine.exercises.map((ex) => (
                  <li key={ex._id} className="border rounded p-4 flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <p className="font-medium">{ex.name}</p>
                      <p className="text-sm text-gray-500">{ex.sets} sets × {ex.reps} reps · {ex.weight ?? 0} kg</p>
                    </div>
                    <button
                      onClick={() => handleRemoveExercise(ex._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Remove"
                    >
                      🗑
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No exercises yet.</p>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t px-6 py-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">Last updated: {new Date(routine.updatedAt).toLocaleString()}</div>
            <div className="space-x-3">
              {!routine.isCompleted && (
                <button onClick={() => markAsComplete(routine._id)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  ✅ Mark as Complete
                </button>
              )}
              <button
                onClick={openEdit}
                className="bg-white text-black border px-4 py-2 rounded hover:bg-gray-100"
              >
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
