import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/configs/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    {/* <Route path="" element={<PrivateRoute />}>
                        <Route index element={<Home />} />
                    </Route> */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
