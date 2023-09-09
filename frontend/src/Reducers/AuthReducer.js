import {
    SET_USER,
    USER_LOGOUT,
    IS_USER_LOADING
  } from '../Actions/AuthActions';

const initialState = {
  authUser: {},
  isUserLoading: true,
};

  const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER:
        return {
          ...state,
          authUser: action.payload
        };
      case USER_LOGOUT:
        return {
          ...state, 
          authUser: {}
        };
      case IS_USER_LOADING:
        return {
          ...state, 
          isUserLoading: action.payload
        };
      default: 
        return state;
    }
  };
  
  export default AuthReducer;