import React, { useState } from 'react'
import BaseSkeleton from '../components/BaseSkeleton'
import useAuthStore from '../store/useAuthStore'
import { Navigate } from 'react-router-dom'
import {ClipLoader} from "react-spinners"

const initFormData = {
  username:"",
  password:""
}


const Login = () => {
  const [logFormData, setLogFormData] = useState(initFormData)
    const {isAuthenticated, onLogin, isLoging} = useAuthStore()

    if(isAuthenticated){
        return <Navigate to="/" />
    }

    const handelFromData = (e) => {
      const {name} = e.target
      setLogFormData(pre => ({...pre, [name]:e.target.value}))
    }
  return (
    <BaseSkeleton>
        <div className='min-h-full flex justify-center items-center'>
          <div className='bg-white px-5 py-7 rounded-md shadow-md w-fit'>
            <h1 className='text-xl'>Login</h1>
            <form className='mt-4' onSubmit={(e) => {onLogin(e, logFormData)}}>
              <div className='flex flex-col text-sm'>
                <label htmlFor='username'>username*</label>
                <input type='text' id='username' name="username" onChange={handelFromData} value={logFormData.username} className='border p-1 rounded outline-none focus:border-black' placeholder='Enter username' />
              </div>
              <div className='flex flex-col text-sm mt-2'>
                <label htmlFor='password'>password*</label>
                <input type='password' name='password' id='password' onChange={handelFromData} value={logFormData.password} className='border p-1 rounded outline-none focus:border-black' placeholder='Enter password' />
              </div>
              <button type='submit' className='bg-black/70 text-white w-full flex items-center justify-center gap-2 py-1 rounded-sm mt-3'>login {isLoging && <ClipLoader size={10} color='#fff' />}</button>
            </form>
          </div>
        </div>
    </BaseSkeleton>
  )
}

export default Login