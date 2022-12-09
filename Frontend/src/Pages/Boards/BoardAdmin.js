import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../Services/UserService";
import '../../index.css'

const BoardAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(getCurrentUser()){
      if(getCurrentUser().role === "ROLE_ADMIN") {
        return;
      }
    }
    navigate('/');
  });

  return (
    <div className="main-container">
      <h2>ADMIN BOARD</h2>
    </div>
  );
};

export default BoardAdmin;
