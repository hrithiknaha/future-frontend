import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Home } from "react-feather";

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
        <div className="bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link to="/" className="text-white font-semibold text-lg flex gap-4">
                    <Home />
                    <span>Future</span>
                </Link>
                {auth.username ? (
                    <div className="flex gap-4 items-center">
                        <Link to={`/profile/${auth.username}`} className="text-white">
                            {auth.username}
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-purple-500 text-white hover:bg-purple-600 font-semibold py-2 px-4 rounded outline">
                            Logout
                        </button>
                    </div>
                ) : (
                    <button className="bg-purple-500 text-white hover:bg-purple-600 font-semibold py-2 px-4 rounded outline">
                        <Link to={"/login"}>Login</Link>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
