import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation (same as homepage) */}
     

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="text-9xl font-bold text-red-500 mb-4">404</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track to your fitness journey.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
            >
              Return Home
            </Link>
            <Link
              to="/workouts"
              className="border-2 border-red-500 text-red-500 hover:bg-red-50 font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
            >
              Browse Workouts
            </Link>
          </div>
          
          <div className="mt-12">
            <img 
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Fitness equipment"
              className="mx-auto rounded-lg shadow-lg max-h-64 object-cover"
            />
          </div>
        </div>
      </main>

      {/* Footer (same as homepage) */}
     
    </div>
  );
};

export default NotFoundPage;