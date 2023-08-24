import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { axiosPrivateInstance } from "../configs/axios";
import { convertTitleToUrl } from "../configs/helpers";

const Home = () => {
    const auth = useSelector((state) => state.auth);

    const [searchQuery, setSearchQuery] = useState();
    const [searchResults, setSearchResults] = useState();

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        const payload = {
            query: searchQuery,
        };

        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance.post("/api/books/search", payload).then(({ data }) => {
            setSearchResults(data.items);
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto flex flex-col py-40 items-center p-4">
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-2">Welcome to Future!</h1>
                    <p className="mb-4">Discover your favorite books!</p>
                </div>
                <form onSubmit={handleSearchSubmit} className="w-full max-w-md flex gap-4 md:pt-8 lg:mt-12">
                    <input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text"
                        placeholder="Search for books"
                        className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-400"
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        Search Book
                    </button>
                </form>
                <div className="flex flex-wrap gap-4 justify-between mt-4 md:mt-8 lg:mt-12">
                    {searchResults &&
                        searchResults.map((book) => (
                            <Link
                                to={`/books/${convertTitleToUrl(book.id, book.volumeInfo.title)}`}
                                key={book.id}
                                className="flex-none flex flex-col w-44 md:w-56 lg:w-64 bg-white shadow-md rounded-md overflow-hidden">
                                <img
                                    className="object-contain w-full h-48 md:h-auto"
                                    src={book.volumeInfo.imageLinks?.thumbnail}
                                    alt="Book Cover"
                                />
                                <div className="flex flex-col justify-between h-full p-4">
                                    <h2 className="text-m font-semibold">{book.volumeInfo.title}</h2>
                                    <p className="text-gray-600 text-m pt-2">{book.volumeInfo.authors}</p>
                                    <div className="flex justify-between mt-2">
                                        <p className="text-gray-600 text-xs">{book.volumeInfo.pageCount} pages</p>
                                        <p className="text-gray-600 text-xs">{book.volumeInfo.publishedDate}</p>
                                    </div>
                                    <p className="text-gray-600 text-m pt-2">{book.volumeInfo.categories}</p>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
