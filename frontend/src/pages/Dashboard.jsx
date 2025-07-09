import { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Plus, Flame, Calendar, BarChart } from 'lucide-react';
import { useRoutineStore } from '../store/useRoutineStore';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { create, get, isLoading, routine } = useRoutineStore();
  const [isOpen, setIsOpen] = useState(false);
  const [Routine, setRoutine] = useState({
    name: '',
    description: '',
    isCompleted: false,
  });

  const [selectedExercises, setSelectedExercises] = useState([]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleRoutine = async (e) => {
    e.preventDefault();
    await create(Routine.name, Routine.description, Routine.isCompleted);
    await get(); // refresh routines after create
    setRoutine({ name: '', description: '', isCompleted: false }); // reset form
    closeModal();
  };

  useEffect(() => {
    get(); // fetch routines on mount
  }, [get]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6 flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <Link to="/routines" className="ml-5 w-0 flex-1">
                <p className="text-sm font-medium text-gray-500 truncate">Today's routines</p>
                <p className="text-2xl font-semibold text-gray-900">Check</p>
              </Link>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6 flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <p className="text-sm font-medium text-gray-500 truncate">Weekly Progress</p>
                <p className="text-2xl font-semibold text-gray-900">3/5 <span className="text-sm text-green-600">workouts</span></p>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6 flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <BarChart className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <p className="text-sm font-medium text-gray-500 truncate">Exercises Logged</p>
                <p className="text-2xl font-semibold text-gray-900">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6 flex items-center">
              <div className="flex-shrink-0 bg-orange-500 rounded-md p-3">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <p className="text-sm font-medium text-gray-500 truncate">Today's Workout</p>
                <p className="text-xl font-semibold text-gray-900">Leg Day</p>
              </div>
            </div>
          </div>
        </div>

        {/* Routines Library */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Your Routines</h2>
          <button
            onClick={openModal}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New routine
          </button>
        </div>

       <div className="bg-white shadow rounded-lg p-6 mb-6">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-900">Routine Library</h2>
    <span className="text-sm text-gray-500">
      {routine?.length || 0} {routine?.length === 1 ? 'routine' : 'routines'}
    </span>
  </div>
  
  <div className="space-y-4">
  {routine.map((r) => (
    <Link
      to={`/routines/${r._id}`}
      key={r._id}
      className={`block p-4 border rounded-lg transition-all hover:shadow-md ${
        r.isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {r.name}
            {r.isCompleted ? (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                Completed
              </span>
            ) : (
              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                In Progress
              </span>
            )}
          </h3>
          <p className="text-gray-600 mt-1">{r.description}</p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">
            {new Date(r.createdAt).toLocaleDateString()}
          </span>
          {r.exercises?.length > 0 && (
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {r.exercises.length}{' '}
              {r.exercises.length === 1 ? 'exercise' : 'exercises'}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Created by: {r.user?.email || 'You'}
        </div>
        <span className="text-sm text-blue-600 font-medium">
          View Details →
        </span>
      </div>
    </Link>
  ))}
</div>

</div>
      </div>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                    Create New Routine
                  </Dialog.Title>
                  <form onSubmit={handleRoutine} className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={Routine.name}
                        onChange={(e) => setRoutine({ ...Routine, name: e.target.value })}
                        className="mt-1 block w-full py-2 px-3 border rounded-md shadow-sm"
                        placeholder="e.g. Upper Body"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <input
                        type="text"
                        value={Routine.description}
                        onChange={(e) => setRoutine({ ...Routine, description: e.target.value })}
                        className="mt-1 block w-full py-2 px-3 border rounded-md shadow-sm"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={Routine.isCompleted}
                        onChange={(e) => setRoutine({ ...Routine, isCompleted: e.target.checked })}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label className="text-sm text-gray-700">Mark as completed</label>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Create Workout
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

export default Dashboard;
