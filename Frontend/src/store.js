import AuthReducer from "./Reducers/AuthReducer";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  AuthReducer,
});

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store;