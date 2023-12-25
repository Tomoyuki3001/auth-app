import React, { useState } from "react";
import "../style/signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        <button type="submit" className="signup-button">
          Sign up
        </button>
      </form>
      <p>
        {/* If you already have an account. <Link to="/login">Log in</Link> */}
      </p>
    </div>
  );
};

export default Signup;
