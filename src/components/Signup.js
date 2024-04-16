import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Banner from "./Banner";

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/signup", { name, username, email, password });
            if (response.data === "exist") {
                alert("User already exists");
            } else if (response.data === "notexist") {
                navigate("/CreateProfile", { state: { id: email } });
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred during signup");
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row justify-between bg-white">
            {/* Banner on the left (for medium screens and larger) */}
            <div className="hidden md:block w-1/3 bg-customYellow p-8">
                <Banner />
            </div>

            {/* Signup form on the right (for all screen sizes) */}
            <div className="w-full md:w-2/3 px-8 py-8 bg-white shadow-lg rounded-lg my-8 flex justify-center items-center">
                <div className="max-w-md w-full">
                    <div className="flex justify-end mb-8">
                        Already a member? 
                        <Link to="/login" className="text-blue-500 hover:text-blue-700 ml-1">
                            Login
                        </Link>
                    </div>
                    <h1 className="text-3xl font-bold mb-6 text-gray-800 text-left">Sign up to Dribbble</h1>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="flex flex-col space-y-2 md:flex-row md:space-x-4">
                            <div className="w-full md:w-1/2">
                                <label htmlFor="name" className="text-md font-medium text-gray-600">
                                    <b>Name</b>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="w-full md:w-1/2" style={{marginTop : "0px"}}>
                                <label htmlFor="username" className="text-md font-medium text-gray-600">
                                    <b>Username</b>
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="email" className="text-md font-medium text-gray-600">
                                <b>Email</b>
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="password" className="text-md font-medium text-gray-600">
                                <b>Password</b>
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                            <input type="checkbox" id="agree" className="form-checkbox h-5 w-5 text-blue-500" />
                            <label htmlFor="agree" className="text-xs text-gray-600">
                                Creating an account means you're okay with our <Link to="#t&c" className="text-blue-500 hover:underline">Terms of Service</Link>, <Link to="#privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>, and our default <Link to="#notification-settings" className="text-blue-500 hover:underline">Notification Settings</Link>.
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-half bg-customPink text-white px-6 py-3 rounded-md hover:bg-red-600 transition duration-300"
                        >
                            Create Account
                        </button>
                        <div className="text-xs text-gray-600">
                            This site is protected by reCAPTCHA and the Google <Link to="#privacy" className="text-blue-500 hover:underline">Privacy Policy</Link> and <Link to="#terms" className="text-blue-500 hover:underline">Terms of Service</Link> apply.
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
