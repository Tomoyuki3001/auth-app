import React, { useState } from "react";
import "../style/signup.css";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("Length must be atleast 6 characters.");
      setPassword("");
      setRePassword("");
    }
    if (password === rePassword) {
      fetchSignInMethodsForEmail(auth, email)
        .then((result) => {
          if (result) {
            alert("Email address already exists.");
            setEmail("");
            setPassword("");
            setRePassword("");
          } else {
            try {
              const userCredential = createUserWithEmailAndPassword(
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
        })
        .catch((error) => {
          // Handle errors
          console.error("Error checking email existence:", error);
        });
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
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-email"
        />
        <input
          type="password"
          placeholder="Password"
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
      <p className="login-create">If you already have an account.</p>
      <Link to="/login">Log in</Link>
    </div>
  );
};

export default Signup;
