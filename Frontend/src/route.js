import Login from "../src/Pages/Login/Login";
import Register from "../src/Pages/Registration/Register";
import Home from "../src/Pages/Home";
import Profile from "../src//Pages/Profile/Profile";
import BoardUser from "../src/Pages/Boards/BoardUser";
import BoardModerator from "../src/Pages/Boards/BoardModerator";
import BoardAdmin from "../src/Pages/Boards/BoardAdmin";

import { Route, Routes } from "react-router-dom";

export let ROUTES = {
  Home: {
    path: "/",
    component: <Home />
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
    component: <Profile />
  },

  BoradUser: {
    path: "/board-user",
    component: <BoardUser />
  },

  BoardModerator: {
    path: "/board-moderator",
    component: <BoardModerator />
  },
  
  BoardAdmin: {
    path: "/board-admin",
    component: <BoardAdmin />
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