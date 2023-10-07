import api from "../utils/api";
import { commonUiActions } from "./commonUiAction";
import { discountCodeActionss } from "../reducer/discountReducer";
import { cartActionss } from "../reducer/cartReducer";
// import moment from "moment";
const createCode =
  ({ code, amount, validFrom, validTo }) =>
  async (dispatch) => {
    try {
      dispatch(discountCodeActionss.allRequest());
      const res = await api.post("/discount", {
        code,
        amount,
        validFrom,
        validTo,
      });
      if (res.status !== 200) throw new Error(res.error);
      dispatch(discountCodeActionss.createCodeSuccess(res.data.data));
      dispatch(getAllCodes())
      dispatch(commonUiActions.showToastMessage("코드생성 완료", "success"));
    } catch (error) {
      dispatch(discountCodeActionss.allFail(error.error));
      dispatch(commonUiActions.showToastMessage(error.error, "error"));
    }
  };

const getAllCodes = () => async (dispatch) => {
  try {
    dispatch(discountCodeActionss.allRequest());
    const res = await api.get("/discount");
    dispatch(discountCodeActionss.getAllcodeSuccess(res.data));
  } catch (error) {
    dispatch(discountCodeActionss.allFail(error.error));
  }
};
const checkCode = (code) => async (dispatch) => {
  try {
    dispatch(discountCodeActionss.allRequest());
    const res = await api.get(`/discount/${code}`);

    // const dateFrom = res.data.data;
    // const check = dateFrom.map((valid) => {
    //   const start = moment(valid.validFrom);
    //   const to = moment(valid.validTo);
    //   const current = moment();
    //   if (current.isBetween(start, to, null)) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
    // console.log(check[0], "check");
    // if (!check[0]) {
    //   dispatch(commonUiActions.showToastMessage("사용 불가능합니다!", "error"));
    //   dispatch(cartActionss.getDiscountPriceSuccess(0));
    //   throw new Error("not valid!");
    // } else {
    //   dispatch(discountCodeActionss.checkCodeSuccess(res.data.data));
    //   dispatch(commonUiActions.showToastMessage("코드사용 가능", "success"));
    // }
  } catch (error) {
    dispatch(discountCodeActionss.allFail(error.error));
    dispatch(commonUiActions.showToastMessage("사용 불가능합니다!", "error"));
  }
};
const deleteCode = (id) => async (dispatch) => {
  try {
    dispatch(discountCodeActionss.allRequest());
    const res = await api.delete(`/discount/${id}`);
    console.log(res, "delete!");
    if (res.status !== 200) throw new Error(res.error);
    dispatch(discountCodeActionss.deleteCode());
    dispatch(getAllCodes());
    dispatch(commonUiActions.showToastMessage("코드제거 완료 ", "success"));
  } catch (error) {
    dispatch(discountCodeActionss.allFail(error.error));
    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
};

export const discountCodeActions = {
  getAllCodes,
  createCode,
  checkCode,
  deleteCode,
};
