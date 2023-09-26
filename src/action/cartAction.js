import api from "../utils/api";

import { commonUiActions } from "../action/commonUiAction";
import { cartActionss } from "../reducer/cartReducer";
const addToCart =
  ({ id, size }) =>
  async (dispatch) => {
    try {
      dispatch(cartActionss.addToCardRequest());
      const response = await api.post("/cart", { productId: id, size, qty: 1 });
      console.log(response.data, "cart!!!!!!!!!!!!!!");
      if (response.status !== 200) throw new Error(response.error);

      dispatch(cartActionss.addToCartSuccess(response.data.cartItemQty));
      dispatch(getCartQty());

      dispatch(commonUiActions.showToastMessage("상품추가 완료", "success"));
    } catch (error) {
      dispatch(cartActionss.addToCartFail(error.error));

      dispatch(commonUiActions.showToastMessage("상품추가 실패", "fail"));
    }
  };

const getCartList = () => async (dispatch) => {
  try {
    dispatch(cartActionss.getCartListRequest());
    const response = await api.get("/cart");
   

    dispatch(cartActionss.getCartListSuccess(response.data.data.items));
    dispatch(cartActionss.getCartUser(response.data.data.userId))
    dispatch(getCartQty());
  } catch (error) {
    dispatch(cartActionss.getCartListFail(error.error));
  }
};
const deleteCartItem = (id) => async (dispatch) => {
  try {
    dispatch(cartActionss.deleteCartItemRequest());
    const response = await api.delete(`/cart/${id}`);
    console.log(response, "delete?");
    if (response.status !== 200) throw new Error(response.error);

    dispatch(cartActionss.deleteCartItemSuccess(response.data));
    dispatch(commonUiActions.showToastMessage("상품삭제 완료", "success"));
    dispatch(getCartList());
    dispatch(getCartQty());
  } catch (error) {
    dispatch(cartActionss.deleteCartItemFail(error.error));
    dispatch(commonUiActions.showToastMessage("Error!", error.error));
  }
};

const updateQty = (id, value) => async (dispatch) => {
  try {
    dispatch(cartActionss.updateCartItemRequest());
    const response = await api.put(`/cart/updateQty/${id}`, { qty: value });
    console.log(response.data.data, "updateQty!f!!!!!!!!   ");
    if (response.status !== 200) throw new Error(response.error);
  
    dispatch(cartActionss.updateCartItemSuccess(response.data.data));
    dispatch(commonUiActions.showToastMessage("수량수정 완료", "success"));
    dispatch(getCartList());
    dispatch(getCartQty());
  } catch (error) {
    dispatch(cartActionss.updateCartItemFail(error.error));
    dispatch(commonUiActions.showToastMessage("Error!", error.error));
  }
};
const getCartQty = () => async (dispatch) => {
  try {
    dispatch(cartActionss.getCartQtyRequest());
    const response = await api.get("/cart");
    const itemQty = response.data.data.items;
    let totalQty = 0;
    itemQty.map((q) => (totalQty += q.qty));

    dispatch(cartActionss.getCartQtySuccess(totalQty));
  } catch (error) {
    dispatch(cartActionss.getCartQtyFail(error.error));
  }
};
export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateQty,
  getCartQty,
};
