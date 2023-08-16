import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, XAxis, Bar, BarChart, YAxis } from "recharts";
import { toast } from "react-hot-toast";

import NotFound from "../components/configs/NotFound";
import LoadingSpinner from "../components/configs/LoadingSpinner";

import { axiosPrivateInstance } from "../configs/axios";

const COLORS = ["#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#ff7c43", "#ffa600"];

const Stats = () => {
    const { username } = useParams();
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [stats, setStats] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth);

        axiosInstance.get(`/api/stats/${username}`).then(({ data }) => {
            console.log(data);
            if (!data.success) {
                toast.success("No Books for Stats!");
                navigate(`/profile/${username}`);
            } else if (rating?.rating) {
                setStats(data);
                setIsLoading(false);
            } else {
                setStats(null);
                setIsLoading(false);
            }
        });
    }, []);
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto py-8 px-4">
                {isLoading ? (
                    <LoadingSpinner />
                ) : !stats ? (
                    <NotFound />
                ) : (
                    <div className="mx-auto p-6 bg-white shadow-md rounded">
                        <h1 className="text-lg md:text-xl lg:text-3xl">Stats</h1>
                        <div className="flex flex-wrap gap-2 mt-2 justify-between md:justify-start text-center">
                            <div className="bg-white shadow-md rounded-lg p-4 w-24 md:w-56 lg:w-64">
                                <h2 className="text-sm md:text-lg font-semibold mb-2">Books</h2>
                                <p className="text-xs md:text-base font-bold text-orange-500">{stats.totalBooks}</p>
                            </div>
                            <div className="bg-white shadow-md rounded-lg p-4 w-24 md:w-56 lg:w-64">
                                <h2 className="text-sm md:text-lg font-semibold mb-2">Pages</h2>
                                <p className="text-xs md:text-base font-bold text-orange-500">{stats.totalPages}</p>
                            </div>
                            <div className="bg-white shadow-md rounded-lg p-4 w-24 md:w-56 lg:w-64">
                                <h2 className="text-sm md:text-lg font-semibold mb-2">Rating</h2>
                                <p className="text-xs md:text-base font-bold text-orange-500">{stats.averageRating}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/2 h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            dataKey="count"
                                            data={stats.statusDataset}
                                            innerRadius={80}
                                            outerRadius={100}>
                                            {stats.statusDataset.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <h1 className="text-sm text-gray-500">STATUS</h1>
                            </div>
                            <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/2 h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            dataKey="count"
                                            data={stats.genreDataset}
                                            innerRadius={80}
                                            outerRadius={100}>
                                            {stats.genreDataset.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <h1 className="text-sm text-gray-500">GENRES</h1>
                            </div>
                            <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/2 h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            dataKey="count"
                                            data={stats.completedLengthDataset}
                                            innerRadius={80}
                                            outerRadius={100}>
                                            {stats.completedLengthDataset.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <h1 className="text-sm text-gray-500">LENGTH</h1>
                            </div>
                            <div className="mt-8 flex flex-col justify-center items-center w-full md:w-1/2 h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            dataKey="count"
                                            data={stats.authorDataset}
                                            innerRadius={80}
                                            outerRadius={100}>
                                            {stats.authorDataset.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <h1 className="text-sm text-gray-500">AUTHORS</h1>
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            <div className="mt-8 flex flex-col justify-center items-center w-full h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.publishedYearDataset}>
                                        <XAxis
                                            dataKey="name"
                                            style={{
                                                fontSize: "0.4rem",
                                            }}
                                        />
                                        <YAxis
                                            width={20}
                                            style={{
                                                fontSize: "0.4rem",
                                            }}
                                        />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#f95d6a" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <h1 className="text-sm text-gray-500">PUBLISHED YEAR</h1>
                            </div>
                            <div className="mt-8 flex flex-col justify-center items-center w-full h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.completedMonthDataset}>
                                        <XAxis
                                            dataKey="name"
                                            style={{
                                                fontSize: "0.4rem",
                                            }}
                                        />
                                        <YAxis
                                            width={20}
                                            style={{
                                                fontSize: "0.4rem",
                                            }}
                                        />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#f95d6a" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <h1 className="text-sm text-gray-500">READ MONTH</h1>
                            </div>
                            <div className="mt-8 flex flex-col justify-center items-center w-full h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.completedRatingDataset}>
                                        <XAxis
                                            dataKey="name"
                                            style={{
                                                fontSize: "0.4rem",
                                            }}
                                        />
                                        <YAxis
                                            width={20}
                                            style={{
                                                fontSize: "0.4rem",
                                            }}
                                        />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#f95d6a" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <h1 className="text-sm text-gray-500">READ RATING</h1>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stats;
