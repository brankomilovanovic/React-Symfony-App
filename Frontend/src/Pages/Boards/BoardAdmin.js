import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../index.css'
import { useSelector } from "react-redux";
import { getCurrentUserToken } from "../../Services/UserService";

const BoardAdmin = () => {
  const navigate = useNavigate();
  const authUser = useSelector(state => state.AuthReducer.authUser);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authUserIsEmpty = Object.keys(authUser).length === 0;
    if (!authUserIsEmpty) {
      setIsLoading(false);
      if(authUser.role === "ROLE_ADMIN") {
        return;
      }
      navigate('/');
    } else if(!getCurrentUserToken()){
      navigate('/');
    }
  }, [authUser]);

  return (
    <div className="main-container">
      <h2>ADMIN BOARD</h2>
      { isLoading && <p>Loading...</p> }
    </div>
  );
};

export default BoardAdmin;
