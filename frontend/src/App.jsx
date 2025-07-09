import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFoundPage from './pages/NotFoundPage';
import SignUpPage from './pages/auth/SignUpPage';
import SignInPage from './pages/auth/SignIn';
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Routines from './pages/Routines';
import RoutineDetailPage from './pages/Routines';

const App = () => {
  const { user, whoAmi, isLoading } = useAuthStore();

  useEffect(() => {
    whoAmi();
  }, [whoAmi]);

  return (
    <div className='flex flex-col bg-gray-900 text-white min-h-screen'>
      <Navbar />
      <div className='flex-grow'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/routines/:id" element={<RoutineDetailPage />} />
        <Route path="/signUp" element={!user ? <SignUpPage /> : <HomePage />} />
        <Route path="/login" element={!user ? <SignInPage /> : <HomePage />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <SignInPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </div>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
};

export default App;
