import { Outlet } from "react-router-dom";
import Header from "../commons/Header";
import Footer from "../commons/Footer";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};
export default Layout;
