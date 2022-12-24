import React, { Fragment } from "react";
import '../../index.css'
import { useSelector } from "react-redux";

const Profile = () => {
  const authUser = useSelector((state) => state.AuthReducer.authUser);

  return (
    <div className="main-container">
      { authUser && <Fragment>
        <div className="row label">Name :&nbsp;
          <div className="desc">{authUser.name}</div>
        </div>
        <div className="row label">Surname :&nbsp;
          <div className="desc">{authUser.surname}</div>
        </div>
        <div className="row label">Username :&nbsp;
          <div className="desc">{authUser.username}</div>
        </div>
        <div className="row label">E-mail :&nbsp;
          <div className="desc">{authUser.email}</div>
        </div>
        <div className="row label">ROLE :&nbsp;
          <div className="desc">{authUser.role}</div>
        </div>
      </Fragment> }
    </div>
  );
};

export default Profile;