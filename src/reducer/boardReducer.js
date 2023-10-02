import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  board: [],
  images: [],
  loading: false,
  error: "",
};

const boardSlice=createSlice({
  name:"board",
  initialState,
  reducers:{
    allRequest(state, action) {
      state.loading = true;
    },
    allFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createBoardSuccess(state,action){
      state.loading = false;
      state.error = "";
    },
    getVisibleSuccess(state,action){
      state.loading=false;
      state.board=action.payload
      state.images=action.payload.img
    },
    makeInvisibleSuccess(state,action){
      state.loading=false;
      state.error=action.payload.error
    },
    deleteBoard(state,action){
      state.loading=false;
      state.error="";
    }
  }
})

export const boardActionss = boardSlice.actions;
export default boardSlice.reducer;