import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Role } from "../../Constants/Role";
import { logout } from "../../Services/SecurityService";
import strings from "../../localization";

const Header = (props) => {

  const authUser = useSelector((state) => state.AuthReducer.authUser);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    logout(dispatch).then(() => {
      window.location = '/login'
    });
  };

  return (
    <div className="header">
      <div className="header-buttons-container">
        <NavLink to={"/"} className="logo-btn">{strings.forms.common.reactApp}</NavLink>
        <NavLink to={"/"} className="home-btn">{strings.pages.home.title}</NavLink>
        { authUser?.role && 
          <div>
            { authUser.role === Role.USER && <NavLink to={"/board-user"} className="home-btn">{strings.pages.boardUser.title}</NavLink> }
            { authUser.role === Role.MODERATOR && <NavLink to={"/board-moderator"} className="home-btn">{strings.pages.boardModerator.title}</NavLink> }
            { authUser.role === Role.ADMIN && <NavLink to={"/board-admin"} className="home-btn">{strings.pages.boardAdmin.title}</NavLink> }
          </div>
        }
      </div>

      <div className="header-buttons-container">
        <div>
          { authUser?.id ? <NavLink to={"/profile"}>{authUser.username}</NavLink> : <NavLink to={"/login"}>{strings.forms.common.login}</NavLink> }
        </div>

        <div>
          { authUser?.id ? <NavLink onClick={handleLogout}>{strings.forms.common.logout}</NavLink> : <NavLink to={"/registration"}>{strings.forms.common.register}</NavLink> }
        </div>
      </div>

    </div>
  );
};

export default Header;
