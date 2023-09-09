import React from "react";
import { useSelector } from "react-redux";
import strings from "../localization";

const Home = () => {
  const authUser = useSelector((state) => state.AuthReducer.authUser);
  
  return (
    <div className="main-container">
      <h2>{strings.pages.home.title}</h2>
      { authUser?.id &&
        <p>
          {strings.pages.home.welcome}, { authUser.name } { authUser.surname}
        </p>
      }
    </div>
  );
};

export default Home;
