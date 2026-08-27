import { createSlice } from "@reduxjs/toolkit";
import { vidData } from "./vidData";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    menuChange: false,
    //if menuChage is false, then menuOverlap true..
    menuOverlap: false,
    vData: vidData,
    bData: [],
  },
  reducers: {
    updateMenuOverlap: (state, action) => {
      console.log(action.payload);
      if (action.payload === undefined) {
        state.menuOverlap = true;
        return;
      }
      state.menuOverlap = action.payload;
    },
    menuToggle: (state, action) => {
      state.menuChange = !state.menuChange;
    },
    filterBtn: (state, action) => {
      state.bData = action.payload.bArray;
      state.vData = state.bData.filter((eleObj) =>
        eleObj.category.includes(action.payload.type),
      );
    },
    searchFun: (state, action) => {
      state.bData = action.payload.arr;
      state.vData = state.bData.filter((obj) =>
        obj.title
          .toLowerCase()
          .includes(action.payload.sTerm.toLowerCase()),
      );
    },
  },
});

export default homeSlice.reducer;
export const { updateMenuOverlap, menuToggle, filterBtn, searchFun } = homeSlice.actions;
