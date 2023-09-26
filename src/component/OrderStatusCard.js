import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";

const OrderStatusCard = ({orderList}) => {
  console.log(orderList)
  return (
   <>
     {orderList?.map((item)=>(
      <div>
     <Row className="status-card">
      
     <Col xs={2}>
       <img
         src={item?.items[0].productId.image}
         alt=""
         height={96}
       />
     </Col>
     <Col xs={8} className="order-info">
       <div>
         <strong>주문번호:{item.orderNum}</strong>
       </div>

       <div className="text-12">{item.updatedAt}</div>
       
 <div> 외 {item.items.length}</div>
 <div>${item.totalPrice}</div>

      

      
     </Col>
     <Col md={2} className="vertical-middle">
       <div className="text-align-center text-12">주문상태</div>
       <Badge bg="warning">preparing</Badge>
     </Col>
   </Row>
   </div>
     
     
     
     
  
     ))
      || (<div>hello</div>)}

     
</>
    
 
  );
};

export default OrderStatusCard;
