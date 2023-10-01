import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({ showPrice,item }) => {

  const navigate = useNavigate();

  const showProduct = (id) => {
    if(!showPrice){
      return navigate('/login')
    }
       return navigate(`/product/${id}`);
    
    
  };
  return (
    <>
      <div className="card" onClick={() => showProduct(item._id)}>
        
        <img src={item.image[0]} alt="" />
        <div>{item.name}</div>
        <div className={!showPrice?'none':''}>$ {currencyFormat(item.price)}</div>
       
      </div>
    </>
  );
};

export default ProductCard;
