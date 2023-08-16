import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/configs/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Book from "./pages/Book";
import Profile from "./pages/Profile";
import Stats from "./pages/Stats";

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
                        <Route path="profile/:username" element={<Profile />} />
                        <Route path="profile/:username/stats" element={<Stats />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
