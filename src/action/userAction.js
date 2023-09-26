import api from "../utils/api";
import { userActionss } from "../reducer/userReducer";
// import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import { cartActionss } from "../reducer/cartReducer";
import { cartActions } from "./cartAction";
import * as commonTypes from "../constants/commonUI.constants";
const loginWithToken = () => async (dispatch) => {
  try {
    const response = await api.get("/user/me");
console.log(response.data.user)
    if (response.status !== 200) throw new Error(response.error);
    dispatch(userActionss.loginTokenSuccess(response.data.user));
  } catch (error) {
    dispatch(userActionss.loginWithTokenFail(error));

    dispatch(userActionss.logout());
  }
};
const loginWithEmail =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(userActionss.loginRequest());
      sessionStorage.removeItem("token");
      const response = await api.post(`/auth/login`, { email, password });

      if (response.status !== 200) throw new Error(response.error);
      sessionStorage.setItem("token", response.data.token);

      dispatch(userActionss.loginSuccess(response.data));
      dispatch(cartActions.getCartQty());
    } catch (error) {
      dispatch(userActionss.loginFail(error.error));
      dispatch(commonUiActions.showToastMessage(error.error, "error"));
    }
  };
const logout = () => async (dispatch) => {
  sessionStorage.removeItem("token");
  dispatch(userActionss.logout());
  dispatch(cartActionss.getCartListSuccess([]));
  dispatch(cartActionss.getCartQtySuccess(0));
};

const loginWithGoogle = (token) => async (dispatch) => {
  try {
    dispatch(userActionss.googleLoginRequest());
    const res = await api.post("/auth/google", { token });
    console.log(res);
    if (res.status !== 200) throw new Error(res.error);
    sessionStorage.setItem("token", res.data.token);
    dispatch(userActionss.googleLoginSuccess(res.data));
  } catch (error) {
    dispatch(userActionss.googleLoginFail(error));
    dispatch(commonUiActions.showToastMessage(error, "error"));
  }
};

const registerUser =
  ({ email, firstName,lastName,address ,password }, navigate) =>
  async (dispatch) => {
    try {
      dispatch(userActionss.registerUserRequest());
      const response = await api.post("/user", { email, firstName,lastName,address ,password });
      console.log(response);
      if (response.status !== 200) throw new Error(response.error);

      dispatch(userActionss.registerUserSuccess());
      dispatch(
        commonUiActions.showToastMessage("회원가입을 완료 했습니다!", "success")
      );
      navigate("/login");
    } catch (error) {
      dispatch(userActionss.registerUserFail(error.error));
    }
  };
export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
};