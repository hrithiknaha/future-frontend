import { useEffect, useState } from "react";

const BookStatus = ({ statuses }) => {
    const [totalCount, setTotalCount] = useState();

    useEffect(() => {
        let totalCount = 0;

        for (const item of statuses) {
            totalCount += item.count;
        }

        setTotalCount(totalCount);
    }, []);

    return (
        <div className="max-w-md mt-4 py-2 px-4 bg-blue-500 text-white rounded">
            <div className="text-xs md:text-sm text-center flex justify-between items-center">
                <div>
                    <div>All</div>
                    <div>{totalCount}</div>
                </div>
                {statuses.map((status) => (
                    <div>
                        <div>{status.status}</div>
                        <div>{status.count}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookStatus;
