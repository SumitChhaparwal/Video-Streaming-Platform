import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    menuChange: false,
    //if menuChage is false, then menuOverlap true..
    menuOverlap: false,
    vData: [],
    bData: [],
  },
  reducers: {
    updateMenuOverlap: (state, action) => {
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
      const videoD = sessionStorage.getItem("videoD");
      state.bData = videoD ? JSON.parse(videoD) : state.vData;
      state.vData = state.bData.filter((eleObj) =>
        eleObj.category.includes(action.payload.type),
      );
    },
    searchFun: (state, action) => {
      const videoD = sessionStorage.getItem("videoD");
      state.bData = videoD ? JSON.parse(videoD) : state.vData;
      state.vData = state.bData.filter((obj) =>
        obj.title.toLowerCase().includes(action.payload.sTerm.toLowerCase()),
      );
    },
    storeData: (state, action) => {
      state.vData = action.payload;
    },
  },
});

export default homeSlice.reducer;
export const {
  updateMenuOverlap,
  menuToggle,
  filterBtn,
  searchFun,
  storeData,
} = homeSlice.actions;
