import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../Services/UserService";
import '../../index.css'

const BoardUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(getCurrentUser()){
      if(getCurrentUser().role === "ROLE_USER") {
        return;
      }
    }
    navigate('/');
  });

  return (
    <div className="main-container">
      <h2>USER BOARD</h2>
    </div>
  );
};

export default BoardUser;
