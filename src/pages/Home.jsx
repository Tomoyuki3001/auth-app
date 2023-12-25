import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <h1>
        Hello {user.email} ! <br /> This is a home page of this auth app!
      </h1>
      <button onClick={handleLogout} className="signup-button">
        Log out
      </button>
    </div>
  );
};

export default Home;
