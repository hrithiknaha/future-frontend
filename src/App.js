import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/configs/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Book from "./pages/Book";

import PrivateRoute from "./components/configs/PrivateRoute";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="" element={<PrivateRoute />}>
                        <Route path="books/:bookId" element={<Book />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
