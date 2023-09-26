import React,{useState} from 'react'
import {  Button,Form} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { requestItemActions } from '../action/requestAction';
import '../style/ReqQty.style.css'
const ReqQty = ({openReq,productId}) => {
  const dispatch=useDispatch()
const [size,setSize]=useState("")
const [qty,setQty]=useState("")
const handleChangeSize=(evt)=>setSize(evt.target.value)
const handleChangeQty=(evt)=>setQty(evt.target.value)

  const reqItems=(size,qty)=>{
  
dispatch(requestItemActions.addRequest({productId,size,qty}))

  }
  return (
    <div className={!openReq?'none':"ReqQty"}>
      <h6>** It will takes within 48hr. </h6>
    <Form.Select aria-label="Default select example" onChange={handleChangeSize}>
      <option>Choose Size</option>
      <option value="sm">sm</option>
      <option value="md">md</option>
      <option value="lg">lg</option>
    </Form.Select>
    <Form.Select aria-label="Default select example" onChange={handleChangeQty}>
    <option>Choose Qty</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
  </Form.Select>
  <Button variant="dark" className='ReqQty-btn' onClick={()=>reqItems(size,qty)} >요청</Button>
  </div>
  )
}

export default ReqQty