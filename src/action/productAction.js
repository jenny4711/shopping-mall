import api from "../utils/api";
import * as types from "../constants/product.constants";
import { productActionss } from "../reducer/productReducer";
import { commonUiActions } from "./commonUiAction";

const getProductList = (query) => async (dispatch) => {
  try {
    dispatch(productActionss.productGetRequest());
    const response = await api.get("/product", {
      params: { ...query },
    });

    if (response.status !== 200) throw new Error(response.error);

    dispatch(productActionss.productGetSuccess(response.data));
  } catch (error) {
    dispatch(productActionss.productGetFail(error.error));

    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
};

const getProductByCategory = (query) => async (dispatch) => {
  try {
    const res = await api.get("/product/category", { params: { ...query } });

    if (res.status !== 200) throw new Error(res.error);
    dispatch(productActionss.productGetByCategorySuccess());
  } catch (error) {
    dispatch(productActionss.productGetFail(error.error));

    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
};

const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch(productActionss.productGetRequest());

    const response = await api.get(`/product/${id}`);

    if (response.status !== 200) throw new Error(response.error);

    dispatch(productActionss.productDetail(response.data.data));
  } catch (error) {

    dispatch(productActionss.productGetFail(error.error));
    dispatch(commonUiActions.showToastMessage(error, "error"));
  }
};

const createProduct = (formData,searchQuery) => async (dispatch) => {
  try {
    dispatch(productActionss.productCreateRequest());

    const response = await api.post("/product", formData);
    if (response.status !== 200) throw new Error(response.error);

    dispatch(productActionss.productCreateSuccess());
    dispatch(commonUiActions.showToastMessage("상품생성 완료", "success"));
    dispatch(getProductList({ page: searchQuery.page }));
  } catch (error) {
    dispatch(productActionss.productCreateFail(error));
    dispatch(commonUiActions.showToastMessage("상품생성 정보를 확인후 다시 시도해주세요!", "error"));
  }
};

const editProduct = (formData, id) => async (dispatch) => {
  try {
    dispatch(productActionss.productEditRequest());

    const response = await api.put(`/product/${id}`, formData);
    if (response.status !== 200) throw new Error(response.error);

    dispatch(productActionss.productEditSuccess(response.data.data));
    dispatch(commonUiActions.showToastMessage("상품 수정 완료", "success"));

    dispatch(getProductList({ page: searchQuery.page, name: "" }));
  } catch (error) {
    dispatch(productActionss.productGetFail(error.error));
    dispatch(commonUiActions.showToastMessage("상품수정 다시 시도해주시기 바랍니다. ", "error"));
  }
};

const updateIsDeleted = (updated, id) => async (dispatch) => {
  try {
    dispatch(productActionss.productEditRequest());
    const update={visible:updated}
    const res = await api.put(`/product/isDeleted/${id}`, update);
    if (res.status !== 200) throw new Error(res.error);
    dispatch(productActionss.productEditSuccess(res.data.data));
    dispatch(commonUiActions.showToastMessage("상품 삭제 완료", "success"));
    dispatch(getProductList({ page: 1, name: "" }));
  } catch (error) {
    dispatch(productActionss.productGetFail(error.error));
    dispatch(commonUiActions.showToastMessage("업데이트를 다시 시도해주세요.", "error"));
  }
};

export const productActions = {
  getProductList,
  createProduct,
  editProduct,
  getProductDetail,
  updateIsDeleted,
  getProductDetail,
  getProductByCategory,
};