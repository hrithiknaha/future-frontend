import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { axiosPrivateInstance } from "../configs/axios";
import { extractIdFromUrl, makeGenreBetter, findBookCompletion } from "../configs/helpers";

import NotFound from "../components/configs/NotFound";
import LoadingSpinner from "../components/configs/LoadingSpinner";
import moment from "moment";

const Book = () => {
    const auth = useSelector((state) => state.auth);
    const { bookId } = useParams();

    const [book, setBook] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const [bookAddedDetails, setBookAddedDetails] = useState([]);
    const [booksInList, setBooksInList] = useState(false);

    const [sentRequestToAdd, setSentRequestToAdd] = useState(false);
    const [sentRequestToStart, setSentRequestToStart] = useState(false);

    const [pageCount, setPageCount] = useState();
    const [sentRequestToUpdatePage, setSentRequestToUpdatePage] = useState(false);

    const [rating, setRating] = useState();
    const [sentRequestToFinish, setSentRequestToFinish] = useState(false);

    useEffect(() => {
        const id = extractIdFromUrl(bookId);
        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance
            .get(`/api/books/${id}/details`)
            .then(({ data }) => {
                setBook(data);

                axiosInstance.get(`/api/books/${id}`).then(({ data }) => {
                    if (!data?.id) {
                        setBooksInList(false);
                        setBookAddedDetails(null);
                        setIsLoading(false);
                    } else {
                        setBooksInList(true);
                        setBookAddedDetails(data);
                        setIsLoading(false);
                    }
                });
            })
            .catch((err) => {
                setBook(null);
                setIsLoading(false);
            });
    }, [bookId]);

    useEffect(() => {
        setIsLoading(true);
        const id = extractIdFromUrl(bookId);

        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance.get(`/api/books/${id}`).then(({ data }) => {
            if (!data?.id) {
                setBooksInList(false);
                setBookAddedDetails(null);
                setIsLoading(false);
            } else {
                setBooksInList(true);
                setBookAddedDetails(data);
                setIsLoading(false);
            }
        });
    }, [sentRequestToAdd, sentRequestToStart, sentRequestToUpdatePage, sentRequestToFinish]);

    const handleAddBook = () => {
        const id = extractIdFromUrl(bookId);

        const payload = {
            bookId: id,
        };

        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance.post("/api/books/add", payload).then(() => {
            setSentRequestToAdd((prev) => !prev);
        });
    };

    const handleStartBook = () => {
        const id = extractIdFromUrl(bookId);

        const payload = {
            startDate: new Date(),
        };

        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance.post(`/api/books/${id}/start`, payload).then(() => {
            setSentRequestToStart((prev) => !prev);
        });
    };

    const handlePageUpdate = (e) => {
        e.preventDefault();

        const id = extractIdFromUrl(bookId);

        const payload = {
            currentPage: pageCount,
        };

        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance.post(`/api/books/${id}/page`, payload).then(({ data }) => {
            setSentRequestToUpdatePage((prev) => !prev);
        });
    };

    const handleFinishBook = () => {
        const id = extractIdFromUrl(bookId);

        const payload = {
            rating,
            endDate: new Date(),
        };

        const axiosInstance = axiosPrivateInstance(auth);
        axiosInstance.post(`/api/books/${id}/end`, payload).then(({ data }) => {
            setSentRequestToFinish((prev) => !prev);
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-4">
                {isLoading ? (
                    <LoadingSpinner />
                ) : !book ? (
                    <NotFound />
                ) : (
                    <div className="mx-auto p-6 bg-white shadow-md rounded">
                        <p className="text-gray-600 text-sm">{book.volumeInfo.authors.join(", ")}</p>

                        <div className="flex justify-between">
                            <h1 className="text-2xl font-semibold">{book.volumeInfo.title}</h1>

                            {booksInList ? (
                                bookAddedDetails.status === "Reading" ? (
                                    <div className="bg-green-500 px-4 py-1 rounded-lg shadow-md text-white flex gap-4 items-center justify-between">
                                        {findBookCompletion(bookAddedDetails.pageCount, bookAddedDetails.currentPage)}%
                                    </div>
                                ) : bookAddedDetails.status === "Stopped" ? (
                                    <div className="bg-red-500 px-4 py-1 rounded-lg shadow-md text-white flex gap-4 items-center justify-between">
                                        Stopped
                                    </div>
                                ) : bookAddedDetails.status === "Completed" ? (
                                    <div className="bg-purple-500 px-4 py-1 rounded-lg shadow-md text-white flex gap-4 items-center justify-between">
                                        <div class="text-3xl font-semibold">{bookAddedDetails.rating}</div>
                                        <div class="text-sm opacity-80">
                                            <span>
                                                {moment(bookAddedDetails.endDate).diff(
                                                    bookAddedDetails.startDate,
                                                    "days"
                                                )}
                                            </span>{" "}
                                            days
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleStartBook}
                                        className="bg-blue-500 text-white p-2 rounded text-sm">
                                        Start Reading
                                    </button>
                                )
                            ) : (
                                <button onClick={handleAddBook} className="bg-blue-500 text-white p-2 rounded text-sm">
                                    Add Book
                                </button>
                            )}
                        </div>

                        <div className="flex gap-2 text-xs mt-2">
                            <p className="text-gray-600">{book.volumeInfo.publishedDate}</p>
                            <p className="text-gray-600">{book.volumeInfo.pageCount} pages</p>
                        </div>

                        <p className="text-gray-600 text-xs my-2">
                            {makeGenreBetter(book.volumeInfo.categories).join(", ")}
                        </p>

                        {booksInList && bookAddedDetails.status === "Reading" && (
                            <div>
                                <form
                                    onSubmit={handlePageUpdate}
                                    className="w-full max-w-md flex justify-between gap-4 pt-4">
                                    <input
                                        onChange={(e) => setPageCount(e.target.value)}
                                        defaultValue={bookAddedDetails.currentPage}
                                        type="number"
                                        placeholder="Page Count"
                                        max={bookAddedDetails.pageCount}
                                        required
                                        className="py-1 px-2 rounded-md border border-gray-300 w-58"
                                    />
                                    <button
                                        type="submit"
                                        className="px-1 py-2 bg-blue-500 text-white rounded text-sm w-full">
                                        Update Page
                                    </button>
                                </form>
                                <form
                                    onSubmit={handleFinishBook}
                                    className="w-full max-w-md flex justify-between gap-4 pt-4">
                                    <input
                                        onChange={(e) => setRating(e.target.value)}
                                        type="number"
                                        placeholder="Rating"
                                        required
                                        className="py-1 px-2 rounded-md border border-gray-300 w-58"
                                    />
                                    <button
                                        type="submit"
                                        className="px-1 py-2 bg-blue-500 text-white rounded text-sm w-full">
                                        Finish
                                    </button>
                                </form>
                            </div>
                        )}

                        <div className="my-4 text-sm">
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
