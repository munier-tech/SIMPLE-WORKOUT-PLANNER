import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFoundPage from './pages/NotFoundPage';
import SignUpPage from './pages/auth/SignUpPage';
import SignInPage from './pages/auth/SignIn';
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from 'react-hot-toast';
const App = () => {

  const { user } = useAuthStore();
  return (
    <>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <SignUpPage /> } />
          <Route path="/" element={user ? <HomePage /> : <SignInPage /> } />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="signUp" element={!user ? <SignUpPage /> : <HomePage />} />
          <Route path="Login" element={!user ? <SignInPage /> : <HomePage /> }  />
        </Routes>
        <Footer/>
      </div>
      <Toaster position="top-center" />
    </>
  );
};
export default App;