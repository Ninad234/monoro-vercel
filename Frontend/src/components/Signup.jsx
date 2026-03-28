import React from 'react'
import {Link, Navigate} from 'react-router-dom'
import Login from './Login'
import API from '../config/api';
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate();
  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm()
  
    const onSubmit = async(data) =>{
      const userInfo ={
        fullname:data.fullname,
        email:data.email,
        password:data.password
      }
      await API.post('/users/signup', userInfo)
      .then((res)=>{
        console.log(res.data)
        if (res.data) {
          localStorage.setItem("Users",JSON.stringify(res.data.user));
          toast.success('Signup Successfully !!');
          navigate('/login');
        }
      }).catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error('This is an error!' + err.response.data.message);
        }
      })
    }
  return (
    <>
    <div className='flex h-screen items-center justify-center bg-white dark:bg-slate-900 transition-colors duration-300'>
    <div className="w-[500px] p-8 rounded-md shadow-2xl bg-white dark:bg-slate-800 border dark:border-slate-700">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg dark:text-white">Sign Up</h3>
          {/* Name */}
          <div className="mt-4 space-y-2">
            <span className="dark:text-gray-300">Name</span>
            <br />
            <input
              type="text"
              placeholder="Enter your Full Name"
              className="w-80 px-3 py-2 rounded-md outline-none bg-white dark:bg-slate-700 dark:text-white border dark:border-slate-600"
              {...register("fullname", { required: true })}
            />
            <br />
            {errors.fullname && <span className="text-sm text-red-500">This field is required</span>}
          </div>
          {/* Email */}
          <div className="mt-4 space-y-2">
            <span className="dark:text-gray-300">Email</span>
            <br />
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-80 px-3 py-2 rounded-md outline-none bg-white dark:bg-slate-700 dark:text-white border dark:border-slate-600"
              {...register("email", { required: true })}
            />
            <br />
            {errors.email && <span className="text-sm text-red-500">This field is required</span>}
          </div>
          {/* Password */}
          <div className="mt-4 space-y-2">
            <span className="dark:text-gray-300">Password</span>
            <br />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-80 px-3 py-2 rounded-md outline-none bg-white dark:bg-slate-700 dark:text-white border dark:border-slate-600"
              {...register("password", { required: true })}
            />
            <br />
            {errors.password && <span className="text-sm text-red-500">This field is required</span>}
          </div>
          {/* Button */}
          <div className="flex justify-between mt-7">
            <button type="submit" className="bg-black text-white rounded-md px-3 py-1 hover:bg-gray-400 duration-300 cursor-pointer">
              Sign Up
            </button>
            <p className="dark:text-gray-300">
              Have Account ?{" "}
              <button type="button"
                className="underline text-blue-500 cursor-pointer"
                onClick={() => document.getElementById("my_modal_5").showModal()}
              >
                Login{" "}
              </button>
            </p>
          </div>
          <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <Link to={'/'} className="btn">Close</Link>
          </div>
        </form>
      </div>
      </div>
      <Login />
    </>
  )
}

export default Signup
