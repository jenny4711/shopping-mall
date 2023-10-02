import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { boardActions } from "../action/boardAction";

const BoardTable = ({ id, title, img, visible,updateBoard}) => {
  const dispatch = useDispatch();
  const [visibleError, setVisibleError] = useState(false);
 
console.log(visible,'vs')
 

  function deleteBoard(id) {
    dispatch(boardActions.deleteBoard(id));
  }

  return (
    <tbody>
      <tr>
        <th>
          <img src={img} width={60} alt={title} />
        </th>
        <th>{title}</th>
        <th>
          <Button
            size="sm"
            variant="danger"
            onClick={() => updateBoard(id)}
            className="mr-1"
          >
            {!visible? "Visible" : "Invisible"}
          </Button>
        </th>
        <th>
          <Button
            variant="dark"
            size="md"
            className="BoardDelete-btn"
            onClick={deleteBoard}
          >
            삭제
          </Button>
        </th>
      </tr>
    </tbody>
  );
};

export default BoardTable;
