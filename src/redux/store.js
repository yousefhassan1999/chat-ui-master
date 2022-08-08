import { configureStore } from "@reduxjs/toolkit";
import UserDataSlice from "./UserData/UserDataSlice";
import UserNameSlice from "./UserData/UserNameSlice";
// const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export const store = configureStore({
  reducer: {
    UserDataStore: UserDataSlice,
    UserNameStore: UserNameSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
