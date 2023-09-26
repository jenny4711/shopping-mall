import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import OrderReceipt from "../component/OrderReceipt";
import PaymentForm from "../component/PaymentForm";
import "../style/paymentPage.style.css";
import { useSelector, useDispatch } from "react-redux";
import { orderActions } from "../action/orderAction";
import { useNavigate } from "react-router";
import { commonUiActions } from "../action/commonUiAction";
import { cc_expires_format } from "../utils/number";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const { cartList, totalPrice, cartUserInfo } = useSelector(
    (state) => state.cart
  );
  const { orderNum, error } = useSelector((state) => state.order);
  const [addUserInfo, setAddUserInfo] = useState(false);
  const [cardValue, setCardValue] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  const navigate = useNavigate();
  const [firstLoading, setFirstLoading] = useState(true);
  const initialAddress =
    cartUserInfo && cartUserInfo.address ? cartUserInfo.address.address : "";
  const initialCity =
    cartUserInfo && cartUserInfo.address ? cartUserInfo.address.city : "";
  const initialZip =
    cartUserInfo && cartUserInfo.address ? cartUserInfo.address.zip : "";
  const initialFirstName =
    cartUserInfo && cartUserInfo.firstName ? cartUserInfo.firstName : "";
  const initialLastName =
    cartUserInfo && cartUserInfo.lastName ? cartUserInfo.lastName : "";
  const initialEmail =
    cartUserInfo && cartUserInfo.email ? cartUserInfo.email : "";
  console.log(initialFirstName, "boolean!!!!!!");
  const [shipInfo, setShipInfo] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    address: "",
    city: "",
    zip: "",
  });

  // ...

  useEffect(() => {
    if (firstLoading) {
      setFirstLoading(false);
    } else {
      if (orderNum !== "") {
        navigate("/payment/success");
      }
    }
  }, [orderNum]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, contact, address, city, zip } = shipInfo;

    const data = {
      totalPrice,
      shipTo: { address, city, zip },
      contact: { firstName, lastName, contact },
      orderList: cartList.map((item) => {
        return {
          productId: item.productId._id,
          price: item.productId.price,
          qty: item.qty,
          size: item.size,
        };
      }),
    };

    const dataByAct = {
      totalPrice,
      shipTo: { address: initialAddress, city: initialCity, zip: initialZip },
      contact: {
        firstName: initialFirstName,
        lastName: initialLastName,
        contact: initialEmail,
      },
      orderList: cartList.map((item) => {
        return {
          productId: item.productId._id,
          price: item.productId.price,
          qty: item.qty,
          size: item.size,
        };
      }),
    };
    if (addUserInfo) {
      if (
        !initialAddress ||
        !initialCity ||
        !initialZip ||
        !initialFirstName ||
        !initialLastName ||
        !initialEmail
      ) {
        console.error("Some fields are missing in your account");
        return;
      }
      dispatch(orderActions.createOrder(dataByAct, navigate));
    } else {
      dispatch(orderActions.createOrder(data, navigate));
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setShipInfo({ ...shipInfo, [name]: value });
  };

  const handlePaymentInfoChange = (event) => {
    const { name, value } = event.target;
    if (name === "expiry") {
      let newValue = cc_expires_format(value);
      setCardValue({ ...cardValue, [name]: newValue });
    }
    setCardValue({ ...cardValue, [name]: value });
    return;
  };

  const handleInputFocus = (e) => {
    setCardValue({ ...cardValue, focus: e.target.name });
  };

  if (cartList && cartList.length === 0) {
    navigate("/cart");
  }
  console.log(addUserInfo);
  return (
    <Container>
      <Row>
        <Col lg={7}>
          <div>
            <h2 className="mb-2">배송 주소</h2>
            <Form>
              <Form.Check
                type="checkbox"
                onChange={() => setAddUserInfo(addUserInfo ? false : true)}
                label="Same address as account"
                id="status-address"
              />
            </Form>
            <div className={!addUserInfo ? "none" : ""}>
              <ul>
                <li>firstName:{initialFirstName}</li>
                <li>lastName:{initialLastName}</li>
                <li>contact:{initialEmail}</li>
                <li>address:{initialAddress}</li>
                <li>city:{initialCity}</li>
              </ul>
            </div>
            <div>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="lastName">
                    <Form.Label>성</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleFormChange}
                      required={!addUserInfo}
                      name="lastName"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="firstName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleFormChange}
                      required={!addUserInfo}
                      name="firstName"
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>연락처</Form.Label>
                  <Form.Control
                    placeholder="010-xxx-xxxxx"
                    onChange={handleFormChange}
                    required={!addUserInfo}
                    name="contact"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>주소</Form.Label>
                  <Form.Control
                    placeholder="Apartment, studio, or floor"
                    onChange={handleFormChange}
                    required={!addUserInfo}
                    name="address"
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      onChange={handleFormChange}
                      required={!addUserInfo}
                      name="city"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      onChange={handleFormChange}
                      required={!addUserInfo}
                      name="zip"
                    />
                  </Form.Group>
                </Row>
                <div className="mobile-receipt-area">
                  <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
                </div>
                <div>
                  <h2 className="payment-title">결제 정보</h2>
                  <PaymentForm
                    cardValue={cardValue}
                    handleInputFocus={handleInputFocus}
                    handlePaymentInfoChange={handlePaymentInfoChange}
                  />
                </div>

                <Button
                  variant="dark"
                  className="payment-button pay-button"
                  type="submit"
                >
                  결제하기
                </Button>
              </Form>
            </div>
          </div>
        </Col>
        <Col lg={5} className="receipt-area">
          <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
