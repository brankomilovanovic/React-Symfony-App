import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../Services/UserService";
import '../index.css'

const Home = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (getCurrentUser()) {
      setUser(getCurrentUser());
    }
  }, []);

  return (
    <div className="main-container">
      <h2>Home Page</h2>
      {user && <p>Welcome, {user.name} {user.surname}</p>}
    </div>
  );
};

export default Home;
