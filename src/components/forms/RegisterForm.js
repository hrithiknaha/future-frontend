import React from "react";
import { Link } from "react-router-dom";

const RegisterForm = ({ handleRegisration, setFirstname, setLastname, setUsername, setPassword }) => {
    return (
        <div className="bg-gra-100">
            <div className="container mx-auto  min-h-screen flex flex-col items-center p-8 py-40">
                <div className="max-w-md w-full px-6 py-8 bg-white shadow-md">
                    <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
                    <form onSubmit={handleRegisration}>
                        <div className="mb-4">
                            <label for="firstname" className="block text-gray-700 font-semibold">
                                Firstname
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                className="mt-1 px-4 py-2 w-full border rounded"
                                placeholder="Firstname"
                                onChange={(e) => setFirstname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label for="lastname" className="block text-gray-700 font-semibold">
                                Lastname
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                className="mt-1 px-4 py-2 w-full border rounded"
                                placeholder="Lastname"
                                onChange={(e) => setLastname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label for="username" className="block text-gray-700 font-semibold">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="mt-1 px-4 py-2 w-full border rounded"
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label for="password" className="block text-gray-700 font-semibold">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="mt-1 px-4 py-2 w-full border rounded"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                            Login
                        </button>
                    </form>
                    <Link to="/login" className="mt-4 underline inline-block">
                        Login?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
