import React, { useState,useEffect } from "react";
import { Container, Form, Button, Alert,Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from '../action/boardAction';


const BoardForm = () => {
  const error = useSelector((state) => state.board.error);
  const dispatch=useDispatch()
  const [visibleError,setVisibleError]=useState(false)
  const [formData,setFormData]=useState({
    title:"",
    img:"",
    visible:false,
  })

function handleSubmit(evt){
  evt.preventDefault();
  const {title,img,visible}=formData;
  dispatch(boardActions.createBoard({title,img,visible}));
  setVisibleError("")
  setFormData("")
}
function handleChange(evt){
  evt.preventDefault();
  const {name,value,checked}=evt.target;
  if (name ==="visible"){
    setFormData({...formData,[name]:checked})
  }else{
    setFormData({...formData,[name]:value});
  }
  
}
console.log(formData,'formdata!!')
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
        <Form.Label>title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Create Title"
          onChange={handleChange}
          required
        />
      </Form.Group>
     
      <Form.Group className="mb-3">
        <Form.Label>Board</Form.Label>
        <Form.Control
          type="text"
          name="img"
          placeholder="Image"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="publish"
            name="visible"
            onChange={handleChange}
            isInvalid={visibleError}
          />
        </Form.Group>

      <Button variant="danger" type="submit">
        생성
      </Button>
    </Form>
  </Container>
  )
}

export default BoardForm