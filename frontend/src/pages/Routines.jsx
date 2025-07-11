import { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { useRoutineStore } from '../store/useRoutineStore';

const RoutineDetailPage = () => {
  /* ---------- Store hookup ---------- */
  const { id } = useParams();
  const {
    getById,
    selectedRoutine: routine,
    addExercise,
    removeExercise,
    markAsComplete,
    update,
    isLoading,
    error,
  } = useRoutineStore();

  /* ---------- Side‑effects ---------- */
  useEffect(() => {
    if (id) getById(id);
  }, [id, getById]);

  /* ---------- Local state ---------- */
  // add‑exercise inline form
  const [newEx, setNewEx] = useState({ name: '', sets: '', reps: '', weight: '' });

  // edit‑routine modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({ name: '', description: '', isCompleted: false });

  /* ---------- Helpers ---------- */
  const handleAddExercise = async (e) => {
    e.preventDefault();                
     addExercise(routine._id , newEx);
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

  const handleRemoveExercise = async (e) => {
    removeExercise()
  }

  /* ---------- Loading / error guards ---------- */
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

  /* ---------- Main UI ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => window.history.back()}
            className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Back</span>
          </button>
          <span className={`px-3 py-1 text-xs rounded-full font-semibold ${routine.isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {routine.isCompleted ? 'Completed' : 'In Progress'}
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
              className="border rounded px-2 py-1 col-span-2"
              placeholder="Exercise name"
              value={newEx.name}
              onChange={(e) => setNewEx({ ...newEx, name: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Sets"
              className="border rounded px-2 py-1"
              value={newEx.sets}
              onChange={(e) => setNewEx({ ...newEx, sets: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Reps"
              className="border rounded px-2 py-1"
              value={newEx.reps}
              onChange={(e) => setNewEx({ ...newEx, reps: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              className="border rounded px-2 py-1"
              value={newEx.weight}
              onChange={(e) => setNewEx({ ...newEx, weight: e.target.value })}
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
                      <p className="text-sm text-gray-500">{ex.sets} sets × {ex.reps} reps · {ex.weight ?? 0} kg</p>
                    </div>
                    <button
                      onClick={() => handleRemoveExercise(routine._id, ex._id)}
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

          {/* Footer actions */}
          <div className="bg-gray-50 border-t px-6 py-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">Last updated: {new Date(routine.updatedAt).toLocaleString()}</div>
            <div className="space-x-3">
              {!routine.isCompleted && (
                <button
                  onClick={() => markAsComplete(routine._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  ✅ Mark as Complete
                </button>
              )}
              <button
                onClick={openEdit}
                className="bg-white text-black border px-4 py-2 rounded hover:bg-gray-100"
              >
                Edit Routine
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* -------- Edit Routine Modal -------- */}
      <Transition appear show={isEditOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsEditOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
            leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-white w-full max-w-md rounded p-6 shadow">
                  <Dialog.Title className="text-lg font-bold mb-4 ">Edit Routine</Dialog.Title>
                  <form onSubmit={handleRoutineUpdate} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <input
                        className="mt-1 w-full border rounded px-3 py-2"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <textarea
                        rows={3}
                        className="mt-1 w-full border rounded px-3 py-2"
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.isCompleted}
                        onChange={(e) => setEditData({ ...editData, isCompleted: e.target.checked })}
                      />
                      <span className="text-sm">Completed</span>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 text-gray-700">
                        Cancel
                      </button>
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                        Save
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default RoutineDetailPage;
