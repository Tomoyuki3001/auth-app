import React, { useState } from "react";
import "../style/signup.css";
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
    <div className="signup">
      <h1 className="signup-header">Log in</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="email"
          placeholder="Your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-email"
        />
        <input
          type="password"
          placeholder="Your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-pw"
        />
        <button type="submit" className="signup-button">
          Log in
        </button>
      </form>
      <p>
        Please create your account.{" "}
        <Link to="/signup">Create your account</Link>
      </p>
      <p>Demo: test@gmail.com / 123456</p>
    </div>
  );
};

export default Login;
