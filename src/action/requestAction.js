import api from "../utils/api";
import { commonUiActions } from "./commonUiAction";
import { requestItemActionss } from "../reducer/requestReducer";
const addRequest =
  ({ productId, size, qty, confirmed }) =>
  async (dispatch) => {
    try {
      dispatch(requestItemActionss.allRequest());
      const res = await api.post("/reqItem", {
        productId,
        size,
        qty,
        confirmed,
      });
      if (res.status !== 200) throw new Error(res.error);
      dispatch(requestItemActionss.itemAddSuccess(res.data.data));
    } catch (error) {
      dispatch(requestItemActionss.allFail(error.error));
    }
  };

const getReqItems = () => async (dispatch) => {
  try {
    dispatch(requestItemActionss.allRequest());
    const res = await api.get("/reqItem");

    dispatch(requestItemActionss.getItemsSuccess(res.data));
  } catch (error) {
    dispatch(requestItemActionss.allFail(error.error));
  }
};
const deletedReqItem = (id) => async (dispatch) => {
  try {
    dispatch(requestItemActionss.allRequest());
    const res = await api.delete(`/reqItem/${id}`);
    if (res.status !== 200) throw new Error(res.error);
    dispatch(requestItemActionss.deleteItemSuccess());

    dispatch(getReqItems());
  } catch (error) {
    dispatch(requestItemActionss.allFail(error.error));
  }
};

export const requestItemActions = {
  addRequest,
  getReqItems,
  deletedReqItem,
};
