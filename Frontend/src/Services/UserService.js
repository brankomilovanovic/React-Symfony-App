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
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
