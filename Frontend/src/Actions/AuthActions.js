import { getCurrentUser } from "../Services/UserService";

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export const userLogin = (authUser) => ({
  type: USER_LOGIN,
  payload: authUser
});

export const userLogout = () => ({
  type: USER_LOGOUT
});

export const fetchCurrentUserData = async (dispatch) => {
  const data = await getCurrentUser();
  dispatch(userLogin(data));
};