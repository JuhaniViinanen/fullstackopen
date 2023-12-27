import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";

const appStore = configureStore({
  reducer: {
    notifications: notificationReducer,
  },
});

export default appStore;
