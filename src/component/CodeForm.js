import React, { useState } from "react";
import { Container, Form, Button, Alert,Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { discountCodeActions } from "../action/discountAction";
import { useNavigate } from "react-router";
import '../style/CodeForm.style.css'


const CodeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.discount.error);

  const currentDate = new Date().toString().split("T")[0];
  const [formData, setFormData] = useState({
    code: "",
    amount: "",
    validFrom: currentDate,
    validTo: currentDate,
  });


  function handleSubmit(evt) {
    evt.preventDefault();
    const { code, amount, validFrom, validTo } = formData;
    dispatch(
      discountCodeActions.createCode({ code, amount, validFrom, validTo })
    );
    setFormData("");
  }

  function handleChange(evt) {
    evt.preventDefault();
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
   
  }
 
  return (
   
     
    <Container className="CodeForm">
      {error && (
        <div>
          <Alert variant="danger" className="error-message">
            {error}
          </Alert>
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>code</Form.Label>
          <Form.Control
            type="text"
            name="code"
            placeholder="Create Code"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            placeholder="Enter amount"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Valid From</Form.Label>
          <Form.Control
            type="date"
            name="validFrom"
            placeholder="From"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Valid To</Form.Label>
          <Form.Control
            type="date"
            name="validTo"
            placeholder="To"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="danger" type="submit">
          생성
        </Button>
      </Form>
    </Container>

   
  );
};

export default CodeForm;
