import React, { useState } from "react";
import "../style/login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsValidEmail(isValid);

    if (!isValid) {
      alert("Please enter a valid email address.");
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } catch (error) {}
    }
  };

  return (
    <div className="login">
      <h1 className="login-header">Log in</h1>
      <p className="login-test">For demo: test@gmail.com / 123456</p>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-email"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-pw"
        />
        <button type="submit" className="login-button">
          Log in
        </button>
      </form>
      <p className="login-create">
        If you don't have, please create your account.
      </p>
      <Link to="/signup">Create your account</Link>
    </div>
  );
};

export default Login;
