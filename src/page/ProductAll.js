import React, { useState, useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";

const ProductAll = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const {level}=useSelector((state)=>state.user.user || {})
  const [showList, setShowList] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  let name = searchParams.get("name");

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
      setShowList(newItem);
    } else {
      setShowList(findByCat);
    }
  }, [productList, setShowList, name]);

  const error = useSelector((state) => state.product.error);
console.log(showList,'list!')
  return (
    <Container>
      <Row>
        {showList.map((item) => (
          <Col md={3} sm={12} key={item._id}>
            <ProductCard setShowPrice={showPrice} item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductAll;
