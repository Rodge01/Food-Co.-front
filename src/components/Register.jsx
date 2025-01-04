import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css"; // Import the Alertify CSS

const Register = () => {
  const [message, setMessage] = useState('');
  const { registerUser } = useAuth();
  const navigate = useNavigate(); // To navigate to login page after successful registration
  alertify.set('notifier', 'position', 'top-left');
  const { register, handleSubmit, formState: { errors } } = useForm();

  // RegisterUser
  const onSubmit = async (data) => {
    try {
      // Register the user, but don't log them in automatically
      await registerUser(data.email, data.password);
      alertify.success("Registration Successful!");
      navigate('/');
    } catch (error) {
      setMessage("Please provide a valid email and password");
      alertify.error("Error: Please provide a valid email and password"); // Error alert
      console.log(error);
    }
  };

  const handleGoogleSignin = () => {
    // Implement Google Sign-in functionality if needed
  };

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          {message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>
        <p className="align-baseline font-medium mt-4 mb-2 text-sm">
          Have an account? Please <Link to='/login' className='text-blue-500 hover:text-blue-700'>Login</Link>
        </p>
        <div>
          <button
            onClick={handleGoogleSignin}
            className="w-full flex gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <FaGoogle className='mr-2' />
            Sign in with Google
          </button>
        </div>
        <p className="mt-5 text-center text-gray-500 text-xs">©2025 Poteto Co. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Register;
