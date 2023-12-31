import { signOut } from "firebase/auth";
import "../style/home.css";
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

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [calculatedData, setCalculatedData] = useState();
  const [array, setArray] = useState([]);
  const [total, setTotal] = useState();
  let nowDate = new Date();

  const deposit = async () => {
    try {
      const docRef = await addDoc(collection(db, "numbers"), {
        date: nowDate.getTime(),
        email: user.email,
        amount: calculatedData * 1,
        status: "Deposit",
      });
      setCalculatedData("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const withdraw = async () => {
    if (total <= 0 || calculatedData > total || calculatedData === 0) {
      alert("Amount Error");
      setCalculatedData("");
    } else {
      try {
        const docRef = await addDoc(collection(db, "numbers"), {
          date: nowDate.getTime(),
          email: user.email,
          amount: calculatedData * -1,
          status: "Withdraw",
        });
        setCalculatedData();
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const deleteNumber = async (id) => {
    await deleteDoc(doc(db, "numbers", id));
  };

  const arrayWithEmail = (array) => {
    let emailArray = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].email === user.email) {
        emailArray.push(array[i]);
      }
    }
    return emailArray;
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
      let userArray = arrayWithEmail(empArray);
      let numArray = [];
      userArray.map((obj) => {
        numArray.push(parseInt(obj.amount));
      });
      let sum = 0;
      numArray.forEach((el) => (sum += el));
      setTotal(sum);
      setArray(userArray.sort((a, b) => a.date - b.date).reverse());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-header">Hello {user.email} !</h1>
      <h2 className="home-header2">
        Use this secret account to build your financial freedom fund!
      </h2>
      <div className="home-amount-container">
        <input
          type="number"
          value={calculatedData}
          className="home-amount"
          placeholder="Amount"
          onChange={(e) => setCalculatedData(e.target.value)}
        />
        <div className="home-button-container">
          <button onClick={deposit} className="home-deposit">
            Deposit
          </button>
          <button onClick={withdraw} className="home-withdraw">
            Withdraw
          </button>
        </div>
      </div>
      <h2 className="home-total">Total: ${total}</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Amount</th>
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
