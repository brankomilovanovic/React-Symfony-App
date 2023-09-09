import Login from "../src/Pages/Login/Login";
import Register from "../src/Pages/Registration/Register";
import Home from "../src/Pages/Home";
import Profile from "../src//Pages/Profile/Profile";
import BoardUser from "../src/Pages/Boards/BoardUser";
import BoardModerator from "../src/Pages/Boards/BoardModerator";
import BoardAdmin from "../src/Pages/Boards/BoardAdmin";

import { Route, Routes, matchPath } from "react-router-dom";
import { Role } from "./Constants/Role";

export let ROUTES = {
  Home: {
    path: "/",
    component: <Home />,
  },

  Login: {
    path: "/login",
    component: <Login />
  },

  Registration: {
    path: "/registration",
    component: <Register />
  },

  Profile: {
    path: "/profile",
    component: <Profile />,
    roles: [Role.USER, Role.MODERATOR, Role.ADMIN]
  },

  ProfileSelected: {
    path: "/profile/:id",
    component: <Profile />,
    roles: [Role.MODERATOR, Role.ADMIN]
  },

  BoradUser: {
    path: "/board-user",
    component: <BoardUser />,
    roles: [Role.USER]
  },

  BoardModerator: {
    path: "/board-moderator",
    component: <BoardModerator />,
    roles: [Role.MODERATOR]
  },
  
  BoardAdmin: {
    path: "/board-admin",
    component: <BoardAdmin />,
    roles: [Role.ADMIN]
  }
};

Object.assign(ROUTES);

export function getRoutes() {
  let result = [];

  for (const [key, value] of Object.entries(ROUTES)) {
    result.push(
      <Route key={"route-" + key} path={value.path} element={value.component} />
    );
  }
  return <Routes>{result}</Routes>;
}

function getRoute(path) {
  for (const [key, value] of Object.entries(ROUTES)) {
      const match = matchPath({
          path: value.path,
          exact: value.exact,
          strict: false
        }, path);

        if(match){
          return value
        }
  }

  return null;
}

export const checkPagePermission = (path, user) => {

  let pathObject = getRoute(path);

  if (!pathObject || !pathObject?.roles) {
      return true;
  }

  if(pathObject?.roles?.length > 0) {
    return pathObject?.roles.includes(user?.role);
  }

  return true;
}
