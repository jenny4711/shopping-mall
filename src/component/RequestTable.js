import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestItemActions } from '../action/requestAction';
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import '../style/RequestTable.style.css'
const RequestTable = ( {idx,item,header,deleteItem}) => {



  return (
    <div>
    <Table striped bordered hover>
      <thead>
        <tr>
          {header.map((title, idx) => (
            <th key={idx}>{title}</th>
          ))}
        
        </tr>
      </thead>
      <tbody>
        <tr>
        <th>{idx}</th>
        <th>{item.userId.email}</th>
        <th>{new Date(item.createdAt).toLocaleDateString()}</th>
        <th>{item.productId.name}</th>
        <th>{item.size}</th>
        <th>{item.qty}</th>
       <th>
        <Button variant='dark' className='reqTable-btn'  onClick={()=>deleteItem(item._id)}>delete</Button>
       </th>
       </tr>
      </tbody>
    </Table>
  </div>
  )
}

export default RequestTable