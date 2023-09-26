
import {createSlice} from '@reduxjs/toolkit'
const initialState = {
  productList: [],
  selectedProduct: null,
  loading: false,
  error: "",
  totalPageNum: 1,
  detailProduct:null,
  byCategory :[],
};

const productSlice = createSlice({
  name:"product",
  initialState,
  reducers:{
    productCreateRequest(state,action){
      state.loading=true;
    },
    productGetRequest(state,action){
      state.loading=true;
    },
    productEditRequest(state,action){
      state.loading=true;
    },
    productCreateSuccess(state,action){
      state.loading=false;
      state.error="";
    },
    productEditSuccess(state,action){
      state.loading=false;
      state.error="";
    },
    productGetSuccess(state,action){
      state.loading=false;
      state.error="";
      state.productList=action.payload.data;
      state.totalPageNum=action.payload.totalPageNum
    },
    productGetByCategorySuccess(state,action){
      state.loading=false;
      state.byCategory=action.payload.data
    },
    productCreateFail(state,action){
      state.loading=false;
      state.error=action.payload.error;

    },
    productGetFail(state,action){
      state.loading=false;
      state.error=action.payload.error;
    },
    productEditFail(state,action){
      state.loading=false;
      state.error=action.payload.error;
    },
    setSelectedProduct(state,action){
      state.selectedProduct=action.payload
    },
    productDetail(state,action){
      state.loading=false;
      state.error="";
      state.productDetail=action.payload;
    }

  }
})




export const productActionss=productSlice.actions
export default productSlice.reducer;