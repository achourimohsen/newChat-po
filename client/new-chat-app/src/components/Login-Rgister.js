import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/login-regester.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/appActions";

const LoginRgister = () => {
    const [activeTab, setActiveTab] = useState("login");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const appState = useSelector((state) => state.app);

    const { loading, auth, error } = appState;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (activeTab === "register" && !formData.username) {
            alert("Please enter your name.");
            return;
        }

        if (!formData.email) {
            alert("Please enter your email.");
            return;
        }

        if (!formData.password) {
            alert("Please enter your password.");
            return;
        }

        if (activeTab === "login") {
            try {
                const res = await axios.post(
                    "http://localhost:3300/api/auth/login",
                    { email: formData.email, password: formData.password }
                );

                localStorage.setItem("auth", JSON.stringify(res.data));
            } catch (err) {
                console.log(err.response);
            }

            const auth = JSON.parse(localStorage.getItem("auth"));

            if (auth === null) {
                return;
            }
            if (auth.token) {
                navigate("/chat");
            }

            setFormData({
                username: "",
                email: "",
                password: "",
            });
        } else {
            try {
                const res = await axios.post(
                    "http://localhost:3300/api/auth/register",
                    formData
                );

                localStorage.setItem("auth", JSON.stringify(res.data));
                console.log(res);
            } catch (err) {
                console.log(err.response);
            }

            const auth = JSON.parse(localStorage.getItem("auth"));

            if (auth === null) {
                return;
            }
            if (auth.token) {
                navigate("/chat");
            }

            setFormData({
                username: "",
                email: "",
                password: "",
            });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-tabs">
                <button
                    className={activeTab === "login" ? "active" : ""}
                    onClick={() => handleTabChange("login")}
                >
                    Login
                </button>
                <button
                    className={activeTab === "register" ? "active" : ""}
                    onClick={() => handleTabChange("register")}
                >
                    Register
                </button>
            </div>
            <form className="auth-form" onSubmit={handleFormSubmit}>
                {activeTab === "register" && (
                    <div className="form-group">
                        <label htmlFor="name">Username</label>
                        <input
                            type="text"
                            id="name"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {activeTab === "login" && (
                    <div className="form-group checkbox">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                    </div>
                )}
                <button type="submit">
                    {activeTab === "login" ? "Login" : "Register"}
                </button>
            </form>
        </div>
    );
};

export default LoginRgister;
