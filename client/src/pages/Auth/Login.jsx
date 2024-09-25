import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Form.css";

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login data", loginData);
    };

    return (
        <div className="login">
            <form className="form" onSubmit={handleSubmit}>
                <div className="title">
                    Welcome,
                    <br />
                    <span>Sign in to continue</span>
                </div>
                <input
                    className="input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={loginData.email}
                    onChange={handleChange}
                />
                <input
                    className="input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={loginData.password}
                    onChange={handleChange}
                />
                <button className="button-confirm" type="submit">
                    Login
                </button>
                <div className="router-link">
                    New user? <Link to="/signup">Sign up</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
