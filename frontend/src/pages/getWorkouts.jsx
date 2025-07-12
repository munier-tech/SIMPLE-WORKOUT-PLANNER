import { useEffect, useState } from 'react';
import useWorkoutStore from '../store/useWorkoutStore';
import { toast } from 'react-hot-toast';
import { FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

const GetWorkoutLogsPage = () => {
  const { workoutLogs, isLoading, getAllWorkoutLogs, deleteWorkoutLog, updateWorkoutLog } = useWorkoutStore();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    note: '',
    isCompleted: false
  });

  useEffect(() => {
    getAllWorkoutLogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this log?")) {
      await deleteWorkoutLog(id);
      toast.success('Workout log deleted');
    }
  };

  const startEditing = (log) => {
    setEditingId(log._id);
    setEditForm({
      note: log.note,
      isCompleted: log.isCompleted
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({
      note: '',
      isCompleted: false
    });
  };

  const handleUpdate = async (id) => {
    try {
      await updateWorkoutLog(id, editForm);
      setEditingId(null);
      toast.success('Workout log updated');
    } catch (error) {
      toast.error('Failed to update workout log');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Workout History</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : workoutLogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No workout logs found. Start logging your workouts!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {workoutLogs.map((log) => (
              <div
                key={log._id}
                className={`rounded-lg p-5 border transition-all ${
                  log.isCompleted 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {new Date(log.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h2>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      log.isCompleted 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {log.isCompleted ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    {editingId === log._id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(log._id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                          title="Save"
                        >
                          <FiCheck size={18} />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                          title="Cancel"
                        >
                          <FiX size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(log)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                          title="Edit"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(log._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {editingId === log._id ? (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`completed-${log._id}`}
                        checked={editForm.isCompleted}
                        onChange={(e) => setEditForm({...editForm, isCompleted: e.target.checked})}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label htmlFor={`completed-${log._id}`} className="text-sm text-gray-700">
                        Mark as completed
                      </label>
                    </div>
                    <textarea
                      value={editForm.note}
                      onChange={(e) => setEditForm({...editForm, note: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Update your notes..."
                    />
                  </div>
                ) : (
                  <>
                    <p className="text-gray-700 mt-3 mb-4 whitespace-pre-line">
                      {log.note || <span className="text-gray-400">No notes provided</span>}
                    </p>
                    
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                        Routines Performed
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {log.routines.map((r, i) => (
                          <div 
                            key={i} 
                            className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg shadow-sm"
                          >
                            <p className="font-semibold">{r.routine?.name || 'Unnamed Routine'}</p>
                            <p className="text-xs text-blue-700 mt-1">{r.routine?.description || 'No description'}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetWorkoutLogsPage;
