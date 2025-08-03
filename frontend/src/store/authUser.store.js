import axios from 'axios'
import toast from 'react-hot-toast'
import { create } from 'zustand'

const useAuthStore = create((set) =>({
    user: null,
    isSigningup : false,
    isError:false,
    errorMessage:null,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLogginIn: false,

    signup: async(credentials)=>{
        set({ isSigningup: true })

        try {
            await axios.post("/api/user/auth/signup",credentials)
            set({isSigningup:false, isError:false})
            toast.success("Account Created Successfully")
            return true
            
        } catch (error) {
            const msg = error.response?.data?.message || "SignUp Error !!! Check your Credentials"
            toast.error(msg)
            set({ user:null, isSigningup: false, isError:true }); 
            return false
        }
    },

    login: async (credentials) => {
        set({isLogginIn:true})

        try {
            const response = await axios.post("/api/user/auth/login",credentials)
            const user = response?.data?.data
            set({ user:user, isLogginIn:false, isError:false})
            toast.success("Account LoggedIn Successfully")
            return true

        } catch (error) {
             const msg = error.response?.data?.message || "Sign In Error !!! Check your Credentials"
            toast.error(msg)
            set({ user:null, isLogginIn: false, isError:true }); 
            return false
        }
    },

    logout: async () => {
        set({isLoggingOut: true})
        try {
            await axios.post("/api/user/auth/logout")
            
            set({user:null, isLoggingOut:false })
            toast.success("logged out Successfully")
            return true

        } catch (error) {
             const msg = error.response?.data?.message || "Logout Error !!! "
            toast.error(msg)
            set({ isLoggingOut: false, isError:true }); 
            return false
        }
    },

    authUserCheck: async () => {
        set({isCheckingAuth:true});
        try {
            const response = await axios.get("/api/user/auth/authcheck")
            set({ user:response.data.user, isCheckingAuth:false})
            
        } catch (error) {
            set({isCheckingAuth:false, user:null})
        }
    }
}))

export default useAuthStore;