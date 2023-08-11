import { Outlet } from "react-router-dom";
import Header from "../commons/Header";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};
export default Layout;
