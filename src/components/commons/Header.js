import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../../redux/actions/auth";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);

    const handleLogout = () => {
        console.log("Logging out user.");
        dispatch(logoutUser(navigate));
    };

    return (
        <div className=" bg-blue-500">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="text-white font-semibold text-lg">Future</div>
                {auth.username ? (
                    <div className="flex gap-4 items-center">
                        <Link className="text-white">{auth.username}</Link>
                        <button
                            onClick={handleLogout}
                            className="bg-blue-500 text-white hover:bg-blue-600 font-semibold py-2 px-4 rounded outline">
                            Logout
                        </button>
                    </div>
                ) : (
                    <button className="bg-blue-500 text-white hover:bg-blue-600 font-semibold py-2 px-4 rounded outline">
                        <Link to={"/login"}>Login</Link>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
