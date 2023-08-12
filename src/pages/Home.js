import React from "react";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto flex flex-col py-40 items-center p-4">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold mb-2">Welcome to Future!</h1>
                    <p className="mb-4">Explore and discover your favorite books</p>
                </div>
                <div className="w-full max-w-md flex">
                    <input
                        type="text"
                        placeholder="Search for books"
                        className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-400"
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Search</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
