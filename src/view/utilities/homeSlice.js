import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    menuChange: false,
    //if menuChage is false, then menuOverlap true..
    menuOverlap: false,
  },
  reducers: {
    updateMenuOverlap: (state, action) => {
      if (action.payload) {
        state.menuOverlap = action.payload;
        return;
      }
      state.menuOverlap = true;
    },
    menuToggle: (state, action) => {
      state.menuChange = !state.menuChange;
    },
  },
});

export default homeSlice.reducer;
export const { updateMenuOverlap, menuToggle } = homeSlice.actions;
