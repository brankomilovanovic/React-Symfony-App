import React from "react";
import "../index.css";
import { useSelector } from "react-redux";

const Home = () => {
  const authUser = useSelector((state) => state.AuthReducer.authUser);
  
  return (
    <div className="main-container">
      <h2>Home Page</h2>
      { authUser.id && (
        <p>
          Welcome, { authUser.name } { authUser.surname}
        </p>
      )}
    </div>
  );
};

export default Home;
