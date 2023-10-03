import React from 'react'
import { useNavigate } from "react-router-dom";
import "../style/ProductCardByCat.style.css"
const EachCard = ({img,id,name,price,showPrice}) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    console.log(id,'id!!!!!!!!!!')
    // if(!showPrice){
    //   return navigate('/login')
    // }
       return navigate(`/product/${id}`);
  
  }

  return (
    <div className='ProductCardByCat' >
    <img onClick={() => showProduct(id)} className='ProductCardByCat-img' width={20} src={img[0]}/>
           
    </div>
  )
}

export default EachCard