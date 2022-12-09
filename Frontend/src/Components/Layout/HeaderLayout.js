import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./HeaderLayout.css";
import { getCurrentUser, logout } from "../../Services/UserService";

const Header = (props) => {

  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    if (getCurrentUser()) {
      setUser(getCurrentUser());
    }
  }, []);

  const handleLogout = async () => {
    await logout().then(() => {
      navigate('/login');
      window.location.reload(false);
    });
  };

  return (
      <header>
        <nav>
          <ul className="menu">
            <li className="logo">
              <NavLink to={"/"} className="logo">React App</NavLink>
              <NavLink to={"/"} className="home-btn">Home</NavLink>
              { user && 
              <span>
                { user['role'] === "ROLE_USER" && <NavLink to={"/board-user"} className="home-btn">User board</NavLink> }
                { user['role'] === "ROLE_MODERATOR" && <NavLink to={"/board-moderator"} className="home-btn">Moderator board</NavLink> }
                { user['role'] === "ROLE_ADMIN" && <NavLink to={"/board-admin"} className="home-btn">Admin board</NavLink> }
              </span>
             }
            </li>
            
            {!user && (
              <li>
                <NavLink to={"/login"}>Login</NavLink>
              </li>
            )}
            {!user && (
              <li>
                <NavLink to={"/registration"}>Sign Up</NavLink>
              </li>
            )}

            {user && (
              <li>
                <NavLink to={"/profile"}>{user.username}</NavLink>
              </li>
            )}

            {user && (
              <li>
                <NavLink onClick={handleLogout}>Logout</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
  );
};

export default Header;
