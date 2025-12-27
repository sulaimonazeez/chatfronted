import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AccountCreate from ".././pages/AccountCreate.jsx";
import { AuthProvider } from ".././auth/AuthProvider.jsx";
import Login from ".././pages/login.jsx";
import Home from ".././pages/home.jsx";
import React from "react";
import AddUsers from ".././pages/addUser.jsx";
import ChatInterface from ".././pages/StartChart.jsx";
import ViewProfile from ".././pages/viewprofie.jsx";
//import HomePage from "./pages/HomePage";
//import PrivateRoute from "./utils/PrivateRoute";
//import ChatApp from ".././pages/landing.jsx";

function Routing() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/create" element={<AccountCreate />} />
                    <Route path="/" element={<Home />} />
                   <Route path="/add" element={<AddUsers />} />
                   <Route path="/chat/:id" element={<ChatInterface />} />
                   <Route path="/profile/:id" element={<ViewProfile />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default Routing;