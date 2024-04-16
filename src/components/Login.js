import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/login", { email, password });
            // Assuming the server sends specific response data for successful login
            if (response.data === "Login successful") {
                // Redirect to the home page or other intended route
                navigate("/home", { state: { id: email } });
            } else {
                // Server should send a meaningful message we can directly display
                alert(response.data);
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Check for error response and alert it
            if (error.response && error.response.data) {
                alert(`Login error: ${error.response.data}`);
            } else {
                alert("An error occurred during login");
            }
        }
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={submit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required // Ensure the input is filled
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required // Ensure the input is filled
                />
                <button type="submit">Login</button>
            </form>
            <p>OR</p>
            <Link to="/Signup">Signup Page</Link>
        </div>
    );
}

export default Login;
