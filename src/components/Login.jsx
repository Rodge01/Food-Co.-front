import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaGoogle} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
const Login = () => {
    const [message, ] = useState('')
    const {loginUser, SingInWithGoogle} = useAuth();
    const navigate = useNavigate();
    alertify.set('notifier', 'position', 'top-left');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data)  => {
      try {
        await loginUser(data.email,data.password);
        alertify.success("Login Succefully!");
        navigate("/")
      } catch (error) {
        alertify.error("Please provide a valid email and password")
        console.log(error)
      }
    }
    const handleGoogleSignin = async () =>{
        try {
          await SingInWithGoogle();
          alert("Login Successfully")
          navigate("/")
        } catch (error) {
          alert("Google Sign in Failed")
          console.log(error)
        }
    }
  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pb-8 mb-4">
        <h2 className="text-x1 font-semibold mb-4">Please Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input {...register("email", { required: true })}
                 type="email" name="email" id="email" placeholder="Email Address" 
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none
                focus:shadow"/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Passowrd</label>
                <input {...register("password", { required: true })}
                 type="password" name="password" id="password" placeholder="Password" 
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none
                focus:shadow"/>
            </div>
            {
                message && <p className="text-red-500 text-xs italic mb-3">{message}</p>
            }
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2
                px-8 rounded focus:outline-none">Login</button>
            </div>
        </form>
        <p className="align-baseline font-medium mt-4 mb-2 text-sm">Haven&apos;t an account? Please <Link to='/register' className='text-blue-500 hover:text-blue-700'>Register</Link></p>
      <div className="mt-4">
        <button onClick={handleGoogleSignin}
        className="w-full flex flex-warp gap-1 items-center justify-center bg-secondary 
        hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <FaGoogle className='mr-2'/>
            Sign in with Google
        </button>
      </div>
      <p className="mt-5 text-center text-gray-500 text-xs ">©2025 Poteto Co. All Righs Reserved</p>
      </div>
    </div>
  );
}

export default Login;
