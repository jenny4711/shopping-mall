import api from '../utils/api';
import { commonUiActions } from './commonUiAction';
import { boardActionss } from '../reducer/boardReducer';

const createBoard=({title,img,visible})=>async(dispatch)=>{
  try{
    dispatch(boardActionss.allRequest())
    const res = await api.post("/board",{title,img,visible})
    if(res.status !==200)throw new Error(res.error);
    dispatch(boardActionss.createBoardSuccess(res.data.data))
    dispatch(commonUiActions.showToastMessage("보드생성 완료","success"))
    dispatch(getAllBoard())
  }catch(error){
    dispatch(boardActionss.allFail(error.error))
    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
}

const getAllBoard =()=>async(dispatch)=>{
  try{
    dispatch(boardActionss.allRequest())
    const res = await api.get('/board')
    if(res.status !==200)throw new Error(res.error);
    dispatch(boardActionss.getVisibleSuccess(res.data.data))


  }catch(error){
    dispatch(boardActionss.allFail(error.error))
    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
}

const makeInvisible=(id,isVisible)=>async(dispatch)=>{
  try{
    dispatch(boardActionss.allRequest())
    const update = {visible:isVisible}
    const res = await api.put(`/board/${id}`,update)
    if(res.status !==200)throw new Error(res.error);
 
 
    dispatch(boardActionss.makeInvisibleSuccess())
    dispatch(getAllBoard())
    dispatch(commonUiActions.showToastMessage("보드수정 완료","success"))
   

    

  }catch(error){
    console.log(error,'invisible?')
    dispatch(boardActionss.allFail(error.error))
    dispatch(commonUiActions.showToastMessage("Error!!", "error"));
  }
}

const deleteBoard=(id)=>async(dispatch)=>{
  try{
    dispatch(boardActionss.allRequest())
    const res= await api.delete(`/board/${id}`)
    if(res.status !==200)throw new Error(res.error)
    dispatch(boardActionss.deleteBoard())
    dispatch(commonUiActions.showToastMessage("보드제거 완료 ","success"))
    dispatch(getAllBoard())


  }catch(error){
    dispatch(boardActionss.allFail(error))
    console.log(error,'errorAction!!')
    dispatch(commonUiActions.showToastMessage('Error', "error"));
  }
}

export const boardActions={
  createBoard,
  getAllBoard,
  makeInvisible,
  deleteBoard,
}