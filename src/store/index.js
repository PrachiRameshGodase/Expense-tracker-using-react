import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import premiumReducer from "./authPremium"

const store = configureStore({
  reducer: {
    auth: authReducer,
    premium: premiumReducer,
  },
});

export default store;
