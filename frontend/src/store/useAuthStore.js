import {create} from 'zustand';
import axios from '../lib/axios.js';
import toast from 'react-hot-toast';
export const useAuthStore = create ((set, get ) => ({
  user : null,
  isAuthorized : false,
  isLoading : false,
  authChecked : false,
  signUp : async ({username , email , password , confirmPassword}) => {
   try {

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    if (!username || !email || !password) {
      toast.error("All fields are required")

      return
    }

     set({isLoading : true, authChecked : false})

    const { data } = await axios.post('/auth/signUp', {
     username,
     email,
     password
    })

     set({ 
        isAuthorized: true,
        user: data.user,
        isLoading: false, 
        authChecked: true
       })

    toast.success('user  created successfully!')
   } catch (error) {
    toast.error(error?.response?.data?.message || "something went wrong")
    set({isLoading : false , isAuthorized : false})
   }
  }
}))