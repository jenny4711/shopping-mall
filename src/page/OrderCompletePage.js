import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../style/paymentPage.style.css";

const OrderCompletePage = () => {
  const { orderNum } = useSelector((state) => state.order.orderNum);
  if (orderNum === "") {
    return (
      <Container>
        <h1>주문실패</h1>
        <div>
          <Link to={"/"}>메인페이지로 돌아가주세요 </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="confirmation-page">
      <img
        src="/image/greenCheck.png"
        width={100}
        className="check-image"
        alt="greenCheck.png"
      />
      <h2>예약이 완료됬습니다!</h2>
      <div>예약번호:{orderNum}</div>
      <div>
        예약 확인은 내 예약 메뉴에서 확인해주세요
        <div className="text-align-center">
          <Link to={"/account/purchase"}>내 예약 바로가기</Link>
        </div>
      </div>
    </Container>
  );
};

export default OrderCompletePage;
