import {Link} from 'react-router-dom';
import React from 'react';

const WorkoutPlanner = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <nav className="bg-black p-4 border-b border-green-800 md:hidden">
        <div className="flex justify-between items-center">
          
          <Link to="/Dashboard" className="text-green-400 font-medium px-3 py-2 rounded hover:bg-green-900 transition">
            Dashboard
          </Link>
          <button className="text-green-400 font-medium px-3 py-2 rounded hover:bg-green-900 transition">
            Log Out
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="relative">
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <img
            className="w-full h-screen object-cover"
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Gym equipment"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-6">
                Your Personal <span className="text-green-500">Workout</span> Planner
              </h1>
              <p className="text-xl text-green-200 mb-8 max-w-2xl mx-auto">
                Create custom workout plans, track your progress, and achieve your fitness goals faster.
              </p>
              <Link to="/Dashboard" className="bg-green-600 hover:bg-green-700 text-black font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105">
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-green-400 mb-12">
              Why Choose FitPlan?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 border border-green-900 hover:border-green-600">
                <div className="text-green-500 mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-300">Personalized Plans</h3>
                <p className="text-green-200">
                  Get workout plans tailored to your fitness level, goals, and available equipment.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 border border-green-900 hover:border-green-600">
                <div className="text-green-500 mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-300">Progress Tracking</h3>
                <p className="text-green-200">
                  Monitor your improvements with detailed statistics and visual progress charts.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 border border-green-900 hover:border-green-600">
                <div className="text-green-500 mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-300">Expert Guidance</h3>
                <p className="text-green-200">
                  Access professional tips and techniques to maximize your workout efficiency.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WorkoutPlanner;