import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../Services/UserService";
import '../../index.css'

const BoardModerator = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(getCurrentUser()){
      if(getCurrentUser().role === "ROLE_MODERATOR") {
        return;
      }
    }
    navigate('/');
  });

  return (
    <div className="main-container">
      <h2>MODERATOR BOARD</h2>
    </div>
  );
};

export default BoardModerator;
