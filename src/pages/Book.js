import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { axiosPrivateInstance } from "../configs/axios";
import { extractIdFromUrl, makeGenreBetter } from "../configs/helpers";

import NotFound from "../components/configs/NotFound";

const Book = () => {
    const auth = useSelector((state) => state.auth);
    const { bookId } = useParams();

    const [book, setBook] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const id = extractIdFromUrl(bookId);
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance.get(`/api/books/${id}/details`).then(({ data }) => {
            setBook(data);
            setIsLoading(false);
        });
    }, [bookId]);
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-4">
                {isLoading ? (
                    <p>Loading...</p>
                ) : !book ? (
                    <NotFound />
                ) : (
                    <div className="mx-auto p-6 bg-white shadow-md rounded">
                        <p className="text-gray-600 text-sm">{book.volumeInfo.authors.join(", ")}</p>

                        <div className="flex justify-between">
                            <h1 className="text-2xl font-semibold">{book.volumeInfo.title}</h1>
                            <button className="bg-blue-500 text-white p-2 rounded-lg text-sm">Add Book</button>
                        </div>

                        <div className="flex gap-2 text-xs mt-2">
                            <p className="text-gray-600">{book.volumeInfo.publishedDate}</p>
                            <p className="text-gray-600">{book.volumeInfo.pageCount} pages</p>
                        </div>

                        <p className="text-gray-600 text-xs my-2">
                            {makeGenreBetter(book.volumeInfo.categories).join(", ")}
                        </p>

                        <div className="my-8 text-sm">
                            <p className="text-gray-600">Overview</p>
                            <p className="text-gray-600">{book.volumeInfo.description}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Book;
