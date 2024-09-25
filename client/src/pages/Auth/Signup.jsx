import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Form.css";

const Signup = () => {
    const [signupData, setSignupData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Signup data", signupData);
    };

    return (
        <div className="signup">
            <form className="form" onSubmit={handleSubmit}>
                <div className="title">
                    Welcome,
                    <br />
                    <span>Sign up to continue</span>
                </div>
                <input
                    className="input"
                    name="username"
                    placeholder="Username"
                    type="text"
                    value={signupData.username}
                    onChange={handleChange}
                />
                <input
                    className="input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={signupData.email}
                    onChange={handleChange}
                />
                <input
                    className="input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={signupData.password}
                    onChange={handleChange}
                />
                <button className="button-confirm" type="submit">
                    Sign up
                </button>
                <div className="router-link">
                    Already have an account? <Link to="/login">Log in</Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;
