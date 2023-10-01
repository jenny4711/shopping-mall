import React, { useState, useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import MainBoard from '../component/MainBoard';
const ProductAll = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const {level}=useSelector((state)=>state.user.user || {})
  const [showList, setShowList] = useState([]);
  const [showPrice,setShowPrice]=useState(false)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchParamsItem= new URLSearchParams(location.search)
 const [show,setShow]=useState(true)

let item = searchParamsItem.get('item'); 
  let name = searchParams.get("name");
  console.log(name,'name')
  console.log(item,'item')

  useEffect(()=>{
    if(level && level === 'customer' || level && level === 'admin'){
       setShowPrice(true)
    }

  },[level])

  useEffect(() => {
    dispatch(productActions.getProductList());
  }, []);
  useEffect(() => {
    const newItem =
      productList &&
      productList?.filter((item, idx) => item.IsDeleted !== true);

    const findByCat = newItem?.filter((item) => {
      return item.category.some((category) => category.includes(name));
    });

   

    if (findByCat.length === 0) {
      setShow(true)
      setShowList(newItem);
    } else {
      setShow(false)
      setShowList(findByCat);
     
    }
  }, [productList, setShow,setShowList, name,item]);

  useEffect(()=>{
    const newItem =
    productList &&
    productList?.filter((item, idx) => item.IsDeleted !== true);

    const findBySearch = newItem?.filter((find)=>
    find.name === item
 )

 if(findBySearch.length === 0){
  setShow(true)
  setShowList(newItem);
 }else{
  setShow(false)
  setShowList(findBySearch)
 }



  },[productList,setShow,setShowList,item])


  const error = useSelector((state) => state.product.error);
console.log(showList,'list!')
  return (
    <Container>
      <div className={!show?'none':""} >
       <MainBoard/>
       </div>
      <Row>
        {showList.map((item) => (
          <Col md={3} sm={12} key={item._id}>
            <ProductCard showPrice={showPrice} item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductAll;
