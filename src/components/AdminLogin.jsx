import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getbaseUrl from "../utils/baseURL";
import alertify from "alertifyjs"; // Import alertify

import "alertifyjs/build/css/alertify.css"; // Import Alertify CSS

const AdminLogin = () => {
    alertify.set('notifier', 'position', 'top-left');
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // State for loading
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true); // Set loading to true when submitting
        console.log(data);
        try {
            const response = await axios.post(`${getbaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const auth = response.data;
            console.log(auth);
            if (auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    alertify.error('Token has expired! Please login again', 0); // Show alert when token expires
                    navigate('/');
                }, 3600 * 1000); // Set timeout for 1 hour (3600 seconds)
                
                alertify.success("Admin Login Successfully", 5); // Show success message
                navigate("/dashboard");
            }
        } catch (error) {
            setMessage("Please provide a valid email and password");
            alertify.error("Invalid credentials, please try again", 5); 
            console.log(error);
        } finally {
            setLoading(false); // Set loading to false once the request is done
        }
    };

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pb-8 mb-4">
                <h2 className="text-x1 font-semibold mb-4">Admin Dashboard Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                        <input {...register("username", { required: true })}
                            type="text" name="username" id="username" placeholder="Username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none
                            focus:shadow" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input {...register("password", { required: true })}
                            type="password" name="password" id="password" placeholder="Password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none
                            focus:shadow" />
                    </div>
                    {
                        message && <p className="text-red-500 text-xs italic mb-3">{message}</p>
                    }
                    <div>
                        <button
                            className={`bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading} // Disable the button while loading
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mx-auto"></div>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </div>
                </form>
                <p className="mt-5 text-center text-gray-500 text-xs ">©2025 Poteto Co. All Rights Reserved</p>
            </div>
        </div>
    );
}

export default AdminLogin;
