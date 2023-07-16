import { NavLink, useNavigate } from "react-router-dom";
import "./HeaderLayout.css";
import { logout } from "../../Services/UserService";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUserData, userLogout } from "../../Actions/AuthActions";
import { useEffect } from "react";

const Header = (props) => {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.AuthReducer.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCurrentUserData(dispatch);
    console.log("Hvataj podatke")
  }, [])

  const handleLogout = async () => {
    await logout().then(() => {
      dispatch(userLogout());
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
              { authUser.role && 
              <span>
                { authUser.role === "ROLE_USER" && <NavLink to={"/board-user"} className="home-btn">User board</NavLink> }
                { authUser.role === "ROLE_MODERATOR" && <NavLink to={"/board-moderator"} className="home-btn">Moderator board</NavLink> }
                { authUser.role === "ROLE_ADMIN" && <NavLink to={"/board-admin"} className="home-btn">Admin board</NavLink> }
              </span>
             }
            </li>
            
            {!authUser.id && (
              <li>
                <NavLink to={"/login"}>Login</NavLink>
              </li>
            )}
            {!authUser.id && (
              <li>
                <NavLink to={"/registration"}>Sign Up</NavLink>
              </li>
            )}

            {authUser.id && (
              <li>
                <NavLink to={"/profile"}>{authUser.username}</NavLink>
              </li>
            )}

            {authUser.id && (
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
