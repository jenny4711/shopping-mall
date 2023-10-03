import api from '../utils/api';
import { commonUiActions } from './commonUiAction';
import { requestItemActionss } from '../reducer/requestReducer';
const addRequest=({productId,size,qty,confirmed})=>async (dispatch)=>{
  try{
   
    dispatch(requestItemActionss.allRequest())
    const res = await api.post("/reqItem",{productId,size,qty,confirmed})
    if(res.status !==200)throw new Error(res.error);
    dispatch(requestItemActionss.itemAddSuccess(res.data.data))
    dispatch(commonUiActions.showToastMessage("요청사항이 정상적으로 요청되었습니다.","success"))
  }catch(error){
    dispatch(requestItemActionss.allFail(error.error))
    dispatch(commonUiActions.showToastMessage("다시 시도하여주시기 바랍니다.",error.error))
  }
}

const getReqItems=()=>async(dispatch)=>{
  try{
    dispatch(requestItemActionss.allRequest())
    const res = await api.get("/reqItem");
    console.log(res.data,'reqAction!')
    dispatch(requestItemActionss.getItemsSuccess(res.data))
  }catch(error){
    dispatch(requestItemActionss.allFail(error.error))
  }
}
const deletedReqItem=(id)=>async(dispatch)=>{
  try{
    dispatch(requestItemActionss.allRequest())
    const res = await api.delete(`/reqItem/${id}`)
    if(res.status !== 200)throw new Error(res.error)
    dispatch(requestItemActionss.deleteItemSuccess())
    dispatch(commonUiActions.showToastMessage("삭제되었습니다.","success"))
  
  dispatch(getReqItems())
  


  }catch(error){
    dispatch(requestItemActionss.allFail(error.error))
    dispatch(commonUiActions.showToastMessage("다시 시도하여주시기 바랍니다.",error.error))
  }
}



export const requestItemActions ={
  addRequest,
  getReqItems,
  deletedReqItem,
}
