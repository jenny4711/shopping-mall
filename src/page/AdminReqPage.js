import React, { useEffect } from "react";
import CodeForm from "../component/CodeForm";
import Codetable from "../component/Codetable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { requestItemActions } from "../action/requestAction";
import RequestTable from "../component/RequestTable";
import { discountCodeActions } from "../action/discountAction";
import Table from "react-bootstrap/Table";
import '../style/adminReq.style.css'

const AdminReqPage = () => {
  const dispatch = useDispatch();
  const { reqItems } = useSelector((state) => state.reqItem);
  const { discount } = useSelector((state) => state.discount);
  const tableHeader = ["#", "user", "date", "itemName", "size", "qty"];
  useEffect(() => {
    dispatch(requestItemActions.getReqItems());
  }, [dispatch]);

  
  useEffect(() => {
    dispatch(discountCodeActions.getAllCodes());
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
      <div className='AdminReqpage-codeForm'>
        <CodeForm />
      </div>
    </div>
  );
};

export default AdminReqPage;
