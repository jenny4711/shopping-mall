import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { cartActions } from "../action/cartAction";
import "../style/productDetail.style.css";
import ReqQty from '../component/ReqQty';
import Images from '../component/Images';

const ProductDetail = () => {
  const dispatch = useDispatch();

  const [size, setSize] = useState("");
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);
  const [openReq,setOpenReq]=useState(false);
  const { productDetail } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);
  const [move,setMove]=useState(false)
  const navigate = useNavigate();



  const addItemToCart = () => {
    if (size === "") {
      setSizeError(true);
      return;
    }

    if (user === null) {
      navigate("/login");
    }

    dispatch(cartActions.addToCart({ id, size }));
  };
  const selectSize = (value) => {
    setSize(value);
    if (sizeError) setSizeError(false);
  
  };

  useEffect(() => {
    dispatch(productActions.getProductDetail(id));
  }, [id]);

  return (
    <Container className="product-detail-card">
      <Row>
      <Col sm={6} className='product-detail-img'>
          {productDetail && productDetail.image && (
            <Row>
              {productDetail.image.map((img, idx) => (
                <Col key={idx} md={6} className="mb-3">
                  <Images img={img} idx={idx} setMove={setMove} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
        <Col className="product-info-area" sm={6}>
          <div className="product-info">
            {productDetail && productDetail?.name}
          </div>
          <div className="product-info">
            $ {productDetail && productDetail?.price}
          </div>
          <div className="product-info">
            {productDetail && productDetail?.description}
          </div>

          <Dropdown
            className="drop-down size-drop-down"
            title={size}
            align="start"
            onSelect={(value, evt) => {
              evt.preventDefault();
              selectSize(value);
            }}
          >
            <Dropdown.Toggle
              className={!move?"size-drop-down":"fixed-drop-down"}
              variant={sizeError ? "outline-danger" : "outline-dark"}
              id="dropdown-basic"
              align="start"
              
            >
              {size === "" ? "사이즈 선택" : size.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu className="size-drop-down">
              {productDetail &&
              productDetail.stock &&
              Object.keys(productDetail.stock).length > 0 ? (
             
                Object.keys(productDetail.stock).map((item, idx) => (

             
                  <Dropdown.Item key={idx} eventKey={item}>
                    {item}-{productDetail.stock[item] !== null?productDetail.stock[item]:0 }
                
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled={true}>사이즈 없음</Dropdown.Item>
              ) }
            </Dropdown.Menu>
          </Dropdown>
          <div className="warning-message">
            {sizeError && "사이즈를 선택해주세요."}
          </div>
          <Button variant="dark" className="add-button" onClick={addItemToCart}>
            추가
          </Button>
         
       
     <div className='Req-section'>
     <Button variant="dark" className='Req-btn' onClick={()=>setOpenReq(!openReq)}>Request Item</Button>
      <ReqQty openReq={openReq} productId={id}/>
     </div>
       
        </Col>
      
    
    
      </Row>
    
    </Container>
  );
};

export default ProductDetail;
