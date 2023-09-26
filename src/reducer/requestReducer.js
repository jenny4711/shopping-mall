import {createSlice} from '@reduxjs/toolkit'
const initialState={
  reqItems:[],
  loading:false,
  error:""
}
const requestSlice = createSlice({
  name:"requestItem",
  initialState,
  reducers:{
    allRequest(state,action){
      state.loading=true;
    },
    allFail(state,action){
      state.loading=false;
      state.error=action.payload.error
    },
    itemAddSuccess(state,action){
      state.loading=false;
      state.error="";
    },
    getItemsSuccess(state,action){
      state.loading=false;
      state.error="";
      state.reqItems=action.payload.data;
    },
    deleteItemSuccess(state,action){
      state.loading=false;
      state.error=""
      
    }
  }
})

export const requestItemActionss=requestSlice.actions
export default requestSlice.reducer;