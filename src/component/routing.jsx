import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AccountCreate from "./AccountCreate.jsx";
import { AuthProvider } from "./AuthProvider.jsx";
import Login from "./login.jsx";
import Home from "./home.jsx";
//import HomePage from "./pages/HomePage";
//import PrivateRoute from "./utils/PrivateRoute";

function Routing() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/create" element={<AccountCreate />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default Routing;