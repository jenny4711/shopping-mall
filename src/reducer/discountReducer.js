import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  discount: [],
  code: [],
  loading: false,
  error: "",
};

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    allRequest(state, action) {
      state.loading = true;
    },
    allFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    createCodeSuccess(state, action) {
      state.loading = false;
      state.error = "";
    },
    getAllcodeSuccess(state, action) {
      state.loading = false;
      state.discount = action.payload.data;
    },
    checkCodeSuccess(state, action) {
      state.loading = false;
      state.error = "";
      state.code = action.payload;
    },
    deleteCode(state, action) {
      state.loading = false;
      state.error = "";
    },
  },
});

export const discountCodeActionss = discountSlice.actions;
export default discountSlice.reducer;
