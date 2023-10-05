import React, { useState, useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container, Alert } from "react-bootstrap";

import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import MainBoard from "../component/MainBoard";
import { boardActions } from "../action/boardAction";
import ProductCardByCat from "../component/ProductCardByCat";
import "../style/ProductCardByCat.style.css";

const ProductAll = () => {
  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state.product);
  const { level } = useSelector((state) => state.user.user || {});
  const { board } = useSelector((state) => state.board);
  const [showList, setShowList] = useState([]);
  const [showPrice, setShowPrice] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchParamsItem = new URLSearchParams(location.search);
  const [show, setShow] = useState(true);

  let name = searchParamsItem.get("name");
  let toLower = name?.toLowerCase();
  let items = searchParams.get("items");

  useEffect(() => {
    if ((level && level === "customer") || (level && level === "admin")) {
      setShowPrice(true);
    }
  }, [level]);
  useEffect(() => {
    dispatch(boardActions.getAllBoard());
    setShow(true);
  }, []);

  useEffect(() => {
    dispatch(productActions.getProductList());
    setShow(true);
  }, []);
  useEffect(() => {
    const newItem =
      productList &&
      productList?.filter((item, idx) => item.IsDeleted !== true);

    const findByCat = newItem?.filter((item) => {
      return item.category.some((category) => category.includes(items));
    });

    if (findByCat.length === 0) {
      setShow(true);
      setShowList(newItem);
    } else {
      setShow(false);
      setShowList(findByCat);
    }
  }, [productList, setShow, setShowList, items]);

  useEffect(() => {
    const newItem =
      productList &&
      productList?.filter((item, idx) => item.IsDeleted !== true);

    const findBySearch = newItem?.filter((find) => {
      if (find.name && typeof find.name === "string") {
        return find.name.toLowerCase().includes(toLower);
      }
      return false;
    });

    if (findBySearch.length === 0) {
      if (name) {
        dispatch(
          commonUiActions.showToastMessage("아이템을 찾을수 없습니다!", "error")
        );
      }

      setShow(true);
      setShowList(newItem);
    } else {
      setShow(false);

      setShowList(findBySearch);
    }
  }, [productList, setShow, setShowList, toLower]);

  const error = useSelector((state) => state.product.error);

  return (
    <Container>
      <div className={!show ? "none" : ""}>
        <MainBoard board={board} showPrice={showPrice} />
      </div>

      <Row className={show ? "none" : ""}>
        {showList.map((item) => (
          <Col md={3} sm={12} key={item._id}>
            <ProductCard showPrice={showPrice} item={item} />
          </Col>
        ))}
      </Row>

      <div className={!show ? "none" : ""}>
        <ProductCardByCat showList={showList} showPrice={showPrice} />
      </div>
    </Container>
  );
};

export default ProductAll;
