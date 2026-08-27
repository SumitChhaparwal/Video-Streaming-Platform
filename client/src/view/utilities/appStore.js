import { configureStore } from "@reduxjs/toolkit";
import homeReducer from './homeSlice.js';

const appStore = configureStore({
  reducer: {
    home: homeReducer,
  },
});

export default appStore;
