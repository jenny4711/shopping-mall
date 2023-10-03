import React from 'react'
import { useNavigate } from "react-router-dom";
import "../style/ProductCardByCat.style.css"
const EachCard = ({img,id,name,price,showPrice}) => {
  console.log(showPrice,'eachCard!')
  const navigate = useNavigate();
  const showProduct = (id) => {
   
    if(showPrice){
      return navigate(`/product/${id}`);
      
    }else{
      return navigate('/login')
    }
      
  
  }

  return (
    <div className='ProductCardByCat' >
    <img onClick={() => showProduct(id)} className='ProductCardByCat-img'  src={img[0]}/>
           
    </div>
  )
}

export default EachCard