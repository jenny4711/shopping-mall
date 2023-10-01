import React,{useState,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { currencyFormat } from "../utils/number";
const ProductTable = ({ header, data, deleteItem, openEditForm }) => {

  const [updatedList,setUpdatedList]=useState([])
  useEffect(()=>{
   const newItem= data.filter((item,idx)=>item.IsDeleted !==true)
   console.group(newItem,'newItem')
   setUpdatedList(newItem)

  },[data])
  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {updatedList.length > 0  ? (
            updatedList.map((item, index) => (
              <tr key={index}>
                <th>{index}</th>
                <th>{item.sku}</th>
                <th style={{ minWidth: "100px" }}>{item.name}</th>
                <th>{currencyFormat(item.price)}</th>
                <th>
                  {Object.keys(item.stock).map((size, index) => (
                    <div key={index}>
                      {size}:{item.stock[size] === null ? 0 :item.stock[size]  }
                      
                    </div>
                  ))}
                </th>
                <th>
                 
                
                 <img src={item.image[0]} width={100} alt="image" />
                </th>
                <th>{item.status}</th>
                <th style={{ minWidth: "100px" }}>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteItem(item._id)}
                    className="mr-1"
                  >
                    -
                  </Button>
                  <Button size="sm" onClick={() => openEditForm(item)}>
                    Edit
                  </Button>
                </th>
              </tr>
            ))
          ) : (
            <tr>No Data to show</tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default ProductTable;
