import React, { Fragment, useEffect, useState } from "react";
import { getCurrentUser } from "../../Services/UserService";
import '../../index.css'

const Profile = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (getCurrentUser()) {
      setUser(getCurrentUser());
    }
  }, []);

  return (
    <div className="main-container">
      { user && <Fragment>
        <div className="row label">Name :&nbsp;
          <div className="desc">{user.name}</div>
        </div>
        <div className="row label">Surname :&nbsp;
          <div className="desc">{user.surname}</div>
        </div>
        <div className="row label">Username :&nbsp;
          <div className="desc">{user.username}</div>
        </div>
        <div className="row label">E-mail :&nbsp;
          <div className="desc">{user.email}</div>
        </div>
        <div className="row label">ROLE :&nbsp;
          <div className="desc">{user.role}</div>
        </div>
      </Fragment> }
    </div>
  );
};

export default Profile;