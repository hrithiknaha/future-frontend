import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ handleLogin, setUsername, setPassword }) => {
    return (
        <div className="bg-gra-100">
            <div className="container mx-auto  min-h-screen flex flex-col items-center p-8 py-40">
                <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-4">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label for="username" className="block text-gray-700 font-medium mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-400"
                            />
                        </div>
                        <div className="mb-4">
                            <label for="password" className="block text-gray-700 font-medium mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                            Login
                        </button>
                    </form>
                    <Link to="/register" className="mt-4 underline inline-block">
                        Register?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
