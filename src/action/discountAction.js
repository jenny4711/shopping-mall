import api from '../utils/api';
import { commonUiActions } from './commonUiAction';
import { discountCodeActionss } from '../reducer/discountReducer';

const createCode=({code,amount,validFrom,validTo})=>async(dispatch)=>{
  try{
    dispatch(discountCodeActionss.allRequest())
    const res = await api.post("/discount",{code,amount,validFrom,validTo})
    if(res.status !==200)throw new Error(res.error);
    dispatch(discountCodeActionss.createCodeSuccess(res.data.data))
    dispatch(commonUiActions.showToastMessage("코드생성 완료","success"))
  }catch(error){
    dispatch(discountCodeActionss.allFail(error.error))
    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
}

const getAllCodes=()=>async(dispatch)=>{
  try{
    dispatch(discountCodeActionss.allRequest())
    const res = await api.get("/discount")
    console.log(res,'res code!')
    dispatch(discountCodeActionss.getAllcodeSuccess(res.data))
  }catch(error){
    dispatch(discountCodeActionss.allFail(error.error))
  }
}
const checkCode=(code)=>async(dispatch)=>{
  try{
    dispatch(discountCodeActionss.allRequest())
    const res = await api.get(`/discount/${code}`)
    console.log(res.data.data,'codeinfo!!action')
    dispatch(discountCodeActionss.checkCodeSuccess(res.data.data))
    dispatch(commonUiActions.showToastMessage("코드사용 가능","success"))
  }catch(error){
    dispatch(discountCodeActionss.allFail(error.error))
    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
}
const deleteCode=(id)=>async(dispatch)=>{
  try{
    dispatch(discountCodeActionss.allRequest())
    const res = await api.delete(`/discount/${id}`)
    console.log(res,'delete!')
    if(res.status !==200)throw new Error(res.error)
    dispatch(discountCodeActionss.deleteCode())
  dispatch(getAllCodes())
    dispatch(commonUiActions.showToastMessage("코드제거 완료 ","success"))
  }catch(error){
    dispatch(discountCodeActionss.allFail(error.error))
    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
}

export const discountCodeActions = {
  getAllCodes,
  createCode,
  checkCode,
  deleteCode,
}