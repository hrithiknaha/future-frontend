import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/configs/Layout";
import Home from "./pages/Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<Home />} />
                    {/* <Route path="" element={<PrivateRoute />}>
                        <Route index element={<Home />} />
                    </Route> */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
