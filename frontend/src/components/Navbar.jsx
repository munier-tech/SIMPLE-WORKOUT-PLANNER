import { SiGnuprivacyguard } from "react-icons/si";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
const Navbar = () => {


  return (
    <div>
       <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-800">
                Fit<span className="text-red-500">Plan</span>
              </h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-red-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Workouts
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Plans
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                About
              </a>
            <Link to="/Login">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-medium rounded-md px-4 py-2 border-2 border-transparent hover:border-gray-300 transition duration-300 inline-flex items-center"
              >
                <div className="flex items-center space-x-2">
                  <IoLogIn className="text-lg" />
                  <span className="text-sm">Sign in</span>
                </div>
              </button>
            </Link>
            <Link to="/signUp">
             <button
              className="hidden md:block bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-md px-4 py-2 border-2 border-transparent hover:border-gray-300 transition duration-300 flex items-center"
            >
              <div className="flex items-center space-x-2">
                <SiGnuprivacyguard className="text-lg" />
                <h1 className="text-sm">Sign up</h1>
              </div>
            </button>
            </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
