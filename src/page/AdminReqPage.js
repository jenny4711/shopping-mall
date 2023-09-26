import React, { useEffect} from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { requestItemActions } from '../action/requestAction';
import RequestTable from '../component/RequestTable';
const AdminReqPage = () => {
  
  const dispatch = useDispatch();
  const {reqItems} = useSelector(state=>state.reqItem)
  const tableHeader =["#",'user','date','itemName','size','qty']
  useEffect(()=>{
    dispatch(requestItemActions.getReqItems())
  },[dispatch])
  function deleteItem(id){
    dispatch(requestItemActions.deletedReqItem(id))
  }
  return (
    <div>
      {reqItems && reqItems?.map((item,idx)=>(<RequestTable idx={idx} deleteItem={deleteItem} item={item} header={tableHeader}/>))}
    </div>
  )
}

export default AdminReqPage