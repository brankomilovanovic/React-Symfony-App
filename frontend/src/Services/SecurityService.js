import { userLogout } from '../Actions/AuthActions';
import { request } from '../Base/HTTP';
import { HttpMethod } from '../Constants/HttpMethod';

export async function login(data) {
  return await request("/api/login", data, HttpMethod.POST);
}

export async function logout(dispatch) {
  localStorage.removeItem("token");
  dispatch(userLogout());
}

