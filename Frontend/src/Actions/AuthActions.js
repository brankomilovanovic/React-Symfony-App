import { getToken } from "../Base/HTTP";
import { getCurrentUser } from "../Services/UserService";

export const SET_USER = 'SET_USER';
export const USER_LOGOUT = 'USER_LOGOUT';
export const IS_USER_LOADING = 'IS_USER_LOADING';

export const setUser = (authUser) => ({
  type: SET_USER,
  payload: authUser
});

export const userLogout = () => ({
  type: USER_LOGOUT
});

export const isUserLoading = (loading) => ({
  type: IS_USER_LOADING,
  payload: loading
});

export const fetchAndStoreCurrentUser = async (dispatch) => {
  const token = getToken();
  if(token) {
    getCurrentUser({extend: true}).then(response => {
      if(response?.data) {
        dispatch(setUser(response?.data));
      }
    }).finally(() => dispatch(isUserLoading(false)));
    return;
  }
  dispatch(isUserLoading(false));
};