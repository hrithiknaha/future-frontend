import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { axiosPrivateInstance } from "../configs/axios";
import LoadingSpinner from "../components/configs/LoadingSpinner";
import NotFound from "../components/configs/NotFound";
import BookStatus from "../components/snippets/BookStatus";

import { computeBookStatus, convertTitleToUrl } from "../configs/helpers";

const Profile = () => {
    const { username } = useParams();
    const auth = useSelector((state) => state.auth);

    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance.get(`/api/users/${username}`).then(({ data }) => {
            if (!data?.username) {
                setUser(null);
                setIsLoading(false);
            } else {
                setUser(data);
                setIsLoading(false);
            }
        });
    }, [username]);
    return (
        <div className=" min-h-screen bg-gray-100">
            <div className="container mx-auto py-8 px-4">
                {isLoading ? (
                    <LoadingSpinner />
                ) : !user ? (
                    <NotFound />
                ) : (
                    <div className="mx-auto p-6 bg-white shadow-md rounded">
                        <h1 className="text-2xl">Hi, {user.username}</h1>
                        <BookStatus statuses={computeBookStatus(user.books)} />
                        <div className="mt-4 flex flex-wrap gap-4 w-full">
                            {user.books
                                .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
                                .map((book) => (
                                    <Link
                                        to={`/books/${convertTitleToUrl(book.id, book.title)}`}
                                        key={book.id}
                                        className="flex-none flex flex-col w-full md:w-56 lg:w-64 bg-white shadow-md rounded-md overflow-hidden">
                                        <div className="flex flex-col justify-between w-full h-full p-4">
                                            <div className="text-xs flex justify-between">
                                                <h2 className="font-semibold">{book.title}</h2>
                                                <p
                                                    className={`p-1 rounded ${
                                                        book.status === "Completed"
                                                            ? "bg-green-500 text-white"
                                                            : book.status === "Reading"
                                                            ? "bg-blue-500 text-white"
                                                            : book.status === "TBR"
                                                            ? "bg-purple-500 text-white"
                                                            : book.status === "Stopped"
                                                            ? "bg-red-500 text-white"
                                                            : ""
                                                    }`}>
                                                    {book.status}
                                                </p>
                                            </div>

                                            <p className="text-gray-600 text-xs pt-1">{book.authors}</p>
                                            <div className="flex justify-between mt-2">
                                                <p className="text-gray-600 text-xs">{book.pageCount} pages</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
