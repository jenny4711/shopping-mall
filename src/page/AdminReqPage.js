import React, { useEffect, useState } from "react";
import CodeForm from "../component/CodeForm";
import Codetable from "../component/Codetable";
import { useDispatch, useSelector } from "react-redux";

import { requestItemActions } from "../action/requestAction";
import RequestTable from "../component/RequestTable";
import { discountCodeActions } from "../action/discountAction";
import { boardActions } from "../action/boardAction";
import Table from "react-bootstrap/Table";
import "../style/adminReq.style.css";
import BoardForm from "../component/BoardForm";
import BoardTable from "../component/BoardTable";

const AdminReqPage = () => {
  const dispatch = useDispatch();
  const { reqItems } = useSelector((state) => state.reqItem);
  const { discount } = useSelector((state) => state.discount);
  const { board } = useSelector((state) => state.board);
  const tableHeader = ["#", "user", "date", "itemName", "size", "qty"];
  const [isVisible, setIsVisible] = useState(board.visible);

  const updateBoard = (id) => {
    setIsVisible(!isVisible);

    return dispatch(boardActions.makeInvisible(id, isVisible));
  };

  useEffect(() => {
    dispatch(requestItemActions.getReqItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(discountCodeActions.getAllCodes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(boardActions.getAllBoard());
  }, [dispatch]);

  function deleteItem(id) {
    dispatch(requestItemActions.deletedReqItem(id));
  }
  return (
    <div>
      <br />
      <h3>Request</h3>
      <div>
        {reqItems &&
          reqItems?.map((item, idx) => (
            <RequestTable
              idx={idx}
              deleteItem={deleteItem}
              item={item}
              header={tableHeader}
            />
          ))}
      </div>

      <br />
      <div>
        <br />
        <h3>Discount Code</h3>
        <Table>
          <thead>
            <tr>
              <th>code</th>
              <th>discount</th>
              <th>from</th>
              <th>to</th>
            </tr>
          </thead>
          {discount &&
            discount?.map((code) => (
              <Codetable
                id={code._id}
                code={code.code}
                amount={code.amount}
                validFrom={code.validFrom}
                validTo={code.validTo}
              />
            ))}
        </Table>
      </div>
      <br />
      <h3>Create Discount Code</h3>
      <div className="AdminReqpage-codeForm">
        <CodeForm />
      </div>
      <br />
      <h3>Board</h3>
      <Table>
        <thead>
          <tr>
            <th>Image</th>
            <th>title</th>
            <th>visible</th>
          </tr>
        </thead>
        {board &&
          board?.map((pic) => (
            <BoardTable
              id={pic._id}
              title={pic.title}
              img={pic.img}
              visible={pic.visible}
              updateBoard={updateBoard}
            />
          ))}
      </Table>
      <br />
      <h3>Create Board Ford</h3>
      <div>
        <BoardForm />
      </div>
    </div>
  );
};

export default AdminReqPage;
