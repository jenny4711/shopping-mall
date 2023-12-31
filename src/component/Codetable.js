import React from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";

import { discountCodeActions } from "../action/discountAction";

const Codetable = ({ id,code,amount,validFrom,validTo}) => {

const dispatch=useDispatch()
  function deleteItem(id){
    dispatch(discountCodeActions.deleteCode(id))
  }
  return (
   
     
        
        <tbody>
          <tr>
          <th>{code}</th>
          <th>%{amount}</th>
          <th>{new Date(validFrom).toLocaleDateString()}</th>
          <th>{new Date(validTo).toLocaleDateString()}</th>
          <th>
            <Button variant='dark' size='md' className='codeDelete-btn' onClick={()=>deleteItem(id)}>삭제</Button>
          </th>
          </tr>
        </tbody>
      
    
  )
}

export default Codetable