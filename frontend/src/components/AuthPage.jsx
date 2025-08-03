import useAuthStore from '../store/authUser.store'

const AuthPage = () => {
  
  const { logout } = useAuthStore()

  return (
    <>
    <div className='flex flex-col text-center items-center justify-center p-4 m-4'>
        this is Authenticated Page
        <button className='bg-red-600 p-4 w-[50%]  ' onClick={logout} > LogOut Button</button>
    </div>
    </>
  )
}

export default AuthPage