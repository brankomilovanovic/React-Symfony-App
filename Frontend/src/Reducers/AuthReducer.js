import {
    USER_LOGIN,
    USER_LOGOUT
  } from '../Actions/AuthActions';

const initialState = {
  authUser: {}
};

  const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_LOGIN:
        return {
          ...state,
          authUser: action.payload
        };
      case USER_LOGOUT:
        return {
          ...state, 
          authUser: {}
        };
      default: 
        return state;
    }
  };
  
  export default AuthReducer;