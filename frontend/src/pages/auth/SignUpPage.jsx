import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useState } from 'react';
import { LoaderIcon } from 'react-hot-toast';
import { Loader } from 'lucide-react';

const SignUpPage = () => {

  const [formData , setFormData ] = useState({
    username: '',
    password: '',
    email: '',
    confirmPassword: ''
  })

    const {signUp , isLoading } = useAuthStore()


  const handleSignUp = async (e) => {
    e.preventDefault(); // ✅ critical
    signUp({...formData}); // ✅ your logic
  };
  return (
    
    <div className="min-h-screen bg-gray-50 flex flex-col">
     

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left Column - Form */}
            <div className="w-full md:w-1/2 lg:w-2/5 bg-white p-8 sm:p-10 rounded-xl shadow-md">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h1>
                <p className="text-gray-600">Join thousands of fitness enthusiasts</p>
              </div>

              <form onSubmit={handleSignUp} className="space-y-6">
               
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      username
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.username}
                      onChange={(e) => {
                        setFormData({ ...formData , username : e.target.value})
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-300"
                      placeholder="Khaalid"
                    />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                    setFormData({ ...formData , email : e.target.value})
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-300"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                     value={formData.password}
                    onChange={(e) => {
                    setFormData({ ...formData , password : e.target.value})
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-300"
                    placeholder="••••••••"
                  />
                  <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => {
                    setFormData({ ...formData , confirmPassword : e.target.value})
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-300"
                    placeholder="••••••••"
                  />
                </div>


              <button
                className='w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105'
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader className="animate-spin mr-2" size={20} />
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link to="/Login" className="text-red-500 font-medium hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="hidden md:block w-1/2 lg:w-3/5 pl-10">
              <div className="relative h-full min-h-[500px] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Fitness equipment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center p-10">
                  <div className="text-white text-center">
                    <h2 className="text-4xl font-bold mb-4">Start Your Fitness Journey</h2>
                    <p className="text-xl mb-6">Join our community and get access to personalized workout plans</p>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center">
                        <svg className="w-6 h-6 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Personalized workout plans</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-6 h-6 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Progress tracking</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-6 h-6 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Expert guidance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;