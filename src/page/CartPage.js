import React from "react";
import { useEffect,useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../action/cartAction";
import CartProductCard from "../component/CartProductCard";
import OrderReceipt from "../component/OrderReceipt";
import { discountCodeActions } from '../action/discountAction';
import "../style/cart.style.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartList, totalPrice,totalDisPrice } = useSelector((state) => state.cart);
  const {code} = useSelector((state)=>state.discount)
  const [discountCode, setDiscountCode] = useState("");
  const [discountInfo, setDiscountInfo] = useState([]); 
 
  const totalAmount = totalDisPrice !== 0?totalDisPrice:""
  async function checkDCCode() {
   
dispatch(discountCodeActions.checkCode(discountCode));
    

      
    
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    checkDCCode(); // 할인 코드 적용 함수 호출
  };

  useEffect(() => {
    dispatch(cartActions.getCartList());
  }, []);
 
  useEffect(()=>{
    if(discountCode){
      dispatch(cartActions.getDiscount(totalPrice,code[0].amount))
    }

  },[code])

  return (
    <Container>
      <Row>
        <Col xs={12} md={7}>
          {cartList && cartList?.length > 0 ? (
            cartList && cartList?.map((item) => <CartProductCard item={item} />)
          ) : (
            <div className="text-align-center empty-bag">
              <h2>카트가 비어있습니다.</h2>
              <div>상품을 담아주세요!</div>
            </div>
          )}
        </Col>
       
    
        
        <Col xs={12} md={5}>
          <OrderReceipt cartList={cartList} totalPrice={totalPrice} totalDisPrice={totalAmount} />
        </Col>
        
      </Row>
      <br/>
      <form onSubmit={handleSubmit}>
        <label>할인코드</label>
        <input
          type="text"
          name="code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)} 
        />
        <button type="submit">적용</button> 
      </form>
    </Container>
  );
};

export default CartPage;
