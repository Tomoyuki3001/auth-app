import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { Table } from "./Table";

const Home = ({ userId }) => {
  const navigate = useNavigate();
  const [calculatedData, setCalculatedData] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const [array, setArray] = useState([]);

  const saveData = async () => {
    try {
      const docRef = await addDoc(collection(db, "numbers"), {
        email: user.email,
        number: calculatedData,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const numbersRef = collection(db, "numbers");
    const unsubscribe = onSnapshot(numbersRef, async (querySnapshot) => {
      let empArray = [];
      await querySnapshot.forEach((doc) => {
        empArray.push({ ...doc.data(), id: doc.id });
      });
      setArray(empArray);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="container">
      <h1>
        Hello {user.email} ! <br /> This is a home page of this auth app!
      </h1>
      <div>
        <label>Calculated Data:</label>
        <input
          type="number"
          value={calculatedData}
          onChange={(e) => setCalculatedData(e.target.value)}
        />
        <button onClick={saveData}>Save Data</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {array.map((item) => (
            <Table key={item.id} email={item.email} number={item.number} />
          ))}
        </tbody>
      </table>
      <button onClick={handleLogout} className="signup-button">
        Log out
      </button>
    </div>
  );
};

export default Home;
