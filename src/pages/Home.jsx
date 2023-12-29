import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { Table } from "./Table";

const Home = ({ userId }) => {
  const navigate = useNavigate();
  const [calculatedData, setCalculatedData] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const [array, setArray] = useState([]);
  const [total, setTotal] = useState(0);
  // const [numArray, setNumArray] = useState([]);

  let date = new Date();
  let newDate = date.toDateString().substring(4);

  const saveData = async () => {
    try {
      const docRef = await addDoc(collection(db, "numbers"), {
        email: user.email,
        number: calculatedData,
        date: newDate,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const deleteNumber = async (id) => {
    await deleteDoc(doc(db, "numbers", id));
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
      let numArray = [];
      empArray.map((obj) => {
        numArray.push(parseInt(obj.number));
      });
      let sum = 0;
      numArray.forEach((el) => (sum += el));
      setTotal(sum);
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
        <label>Put a number:</label>
        <input
          type="number"
          value={calculatedData}
          onChange={(e) => setCalculatedData(e.target.value)}
        />
        <button onClick={saveData}>Add</button>
      </div>
      <div>
        <p>Total: {total}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {array.map((item) => (
            <Table key={item.id} item={item} deleteNumber={deleteNumber} />
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
