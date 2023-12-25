import React, { useState } from "react";
import "../style/signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === rePassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } catch (error) {}
    } else {
      alert("Please type same password");
    }
  };

  return (
    <div className="signup">
      <h1 className="signup-header">Sign up</h1>
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
        <input
          type="password"
          placeholder="Password again"
          required
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          className="signup-pw"
        />
        <button type="submit" className="signup-button">
          Sign up
        </button>
      </form>
      <p>
        If you already have an account. <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Signup;
