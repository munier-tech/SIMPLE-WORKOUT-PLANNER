import { SiGnuprivacyguard } from "react-icons/si";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { Loader, LogIn, LogOutIcon, SignalHigh, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, SignOut, isLoading } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const HandleSignOut = (e) => {
    e.preventDefault();
    SignOut();
  }

  return (
    <div>
      <nav className="bg-black shadow-sm border-b border-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to={"/"} className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-green-400">
                Simple<span className="text-green-500"> Workout Planner</span>
              </h1>
            </Link>
            
            {/* Mobile menu button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-green-400 hover:text-green-300 focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Link
                to="/"
                className="text-green-400 hover:text-green-300 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-green-500"
              >
                Home
              </Link>
              <Link
                to="#"
                className="text-green-400 hover:text-green-300 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-green-500"
              >
                Workouts
              </Link>
              <Link
                to="#"
                className="text-green-400 hover:text-green-300 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-green-500"
              >
                Plans
              </Link>
              <Link
                to="/dashboard"
                className="px-3 py-2 flex items-center bg-green-600 hover:bg-green-700 text-black font-bold rounded-md text-sm"
              >
                Dashboard
              </Link>

              {user ? (
                <button
                  onClick={HandleSignOut}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-md px-3 py-2 border-2 border-transparent hover:border-green-300 transition duration-300 inline-flex items-center text-sm"
                >
                  <div className="flex items-center space-x-1">
                    <LogOutIcon className="h-4 w-4" />
                    <span>
                      {isLoading ? <Loader className="animate-spin text-white h-4 w-4" /> : "Logout"}
                    </span>
                  </div>
                </button>
              ) : (
                <>
                  <Link to="/Login">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-black font-medium rounded-md px-3 py-2 border-2 border-transparent hover:border-green-300 transition duration-300 inline-flex items-center text-sm"
                    >
                      <div className="flex items-center space-x-1">
                        <LogIn className="h-4 w-4" />
                        <span>Login</span>
                      </div>
                    </button>
                  </Link>
                  <Link to="/signUp">
                    <button
                      className="hidden md:block bg-blue-600 hover:bg-blue-700 text-black font-medium rounded-md px-3 py-2 border-2 border-transparent hover:border-green-300 transition duration-300  items-center text-sm"
                    >
                      <div className="flex items-center space-x-1">
                        <SignalHigh className="h-4 w-4" />
                        <span>Sign up</span>
                      </div>
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-gray-900 border-t border-green-800">
            <div className="pt-2 pb-3 space-y-1 px-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-green-400 hover:bg-gray-800 hover:text-green-300 block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                to="#"
                onClick={() => setMobileMenuOpen(false)}
                className="text-green-400 hover:bg-gray-800 hover:text-green-300 block px-3 py-2 rounded-md text-base font-medium"
              >
                Workouts
              </Link>
              <Link
                to="#"
                onClick={() => setMobileMenuOpen(false)}
                className="text-green-400 hover:bg-gray-800 hover:text-green-300 block px-3 py-2 rounded-md text-base font-medium"
              >
                Plans
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-green-400 hover:bg-gray-800 hover:text-green-300 block px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-green-800 px-4">
              {user ? (
                <button
                  onClick={(e) => {
                    HandleSignOut(e);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  {isLoading ? (
                    <Loader className="animate-spin h-5 w-5 text-white" />
                  ) : (
                    <>
                      <LogOutIcon className="mr-2 h-4 w-4" />
                      Sign out
                    </>
                  )}
                </button>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/Login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-600 hover:bg-green-700"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign in
                  </Link>
                  <Link
                    to="/signUp"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-blue-600 hover:bg-blue-700"
                  >
                    <SignalHigh className="mr-2 h-4 w-4" />
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar;