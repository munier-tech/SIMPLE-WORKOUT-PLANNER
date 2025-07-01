import Create from 'zustand';
import axios from '../lib/axios';
import toast from 'react-hot-toast';
const useAuthStore = Create ((set, get ) => ({
  user : null,
  isAuthorized : false,
  isLoading : false,
  authChecked : false,
  Login : async () => {
   try {

     set({isLoading : true, authChecked : false})

    const res = await axios.post('/auth/login', {
     username,
     email,
     password
    })

     set({ 
        isAuthorized: true,
        user: res.data.user,
        isLoading: false, 
        authChecked: true
       })
    
    toast.success('Login successful!')
   } catch (error) {
    toast.error(error?.response?.data?.message || "something went wrong")
    set({isLoading : false , isAuthorized : false})
   }
  }
}))