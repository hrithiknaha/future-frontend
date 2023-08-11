import React from "react";

const Home = () => {
    return (
        <div class="bg-gray-100 h-screen flex flex-col py-40 items-center p-4">
            <div class="text-center">
                <h1 class="text-3xl font-semibold mb-2">Welcome to Future</h1>
                <p class="text-gray-600 mb-4">Explore and discover your favorite books</p>
            </div>
            <div class="w-full max-w-md flex space-x-2">
                <input
                    type="text"
                    placeholder="Search for books"
                    class="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-400"
                />
                <button class="px-4 py-2 bg-blue-500 text-white rounded-md">Search</button>
            </div>
        </div>
    );
};

export default Home;
