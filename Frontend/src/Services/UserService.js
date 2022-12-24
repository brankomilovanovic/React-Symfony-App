import jwt from 'jwt-decode'

export const login = async (data) => {
  const login = await fetch("https://localhost:8000/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await login.json();
};

export const registration = async (data) => {
  const registration = await fetch("https://localhost:8000/api/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return registration;
};

export const logout = async () => {
  localStorage.removeItem("token");
};

export const getCurrentUserToken = () => {
  return localStorage.getItem("token");
};

export const getCurrentUser = async () => {
    let currentUser = {};
    if(localStorage.getItem("token")) {
      const user = jwt(localStorage.getItem("token"));
      currentUser = await fetch("https://localhost:8000/api/users/" + user.id, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
      }
    }).then((response) => response.json())
  }
  return currentUser;
};
