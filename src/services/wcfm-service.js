import request from 'src/utils/fetch';
import queryString from 'qs';

const getProducts = (query, token) =>
  request.get(`/wcfmmp/v1/products?${queryString.stringify(query)}`, {}, token);

const getCategories = (query, token) =>
  request.get(
    `/mobile-builder/v1/categories?${queryString.stringify(query)}`,
    {},
    token,
  );

const addProduct = (data, token) => {
  const {image, ...rest} = data;
  const dataAdd = {
    ...rest,
    featured_image: {
      src: image,
    },
  };
  return request.post(
    '/wcfmmp/v1/products',
    JSON.stringify(dataAdd),
    'POST',
    token,
  );
};

const updateProduct = (productId, data, token) => {
  const {image, ...rest} = data;
  const dataUpdate = {
    ...rest,
    featured_image: {
      src: image,
    },
  };
  return request.put(
    `/wcfmmp/v1/products/${productId}`,
    JSON.stringify(dataUpdate),
    token,
  );
};

const deleteProduct = (id, token) =>
  request.delete(`/wcfmmp/v1/products/${id}`, {}, token);

const getOrders = (query, token) =>
  request.get(`/wcfmmp/v1/orders?${queryString.stringify(query)}`, {}, token);

const updateOrders = (idOrder, data, token) =>
  request.put(`/wcfmmp/v1/orders/${idOrder}`, JSON.stringify(data), token);

const getSales = (query, token) =>
  request.get(
    `/wcfmmp/v1/sales-stats?${queryString.stringify(query)}`,
    {},
    token,
  );

const getDataReport = (query, token) =>
  request.get(
    `/mobile-builder/v1/wcfm-report-chart?${queryString.stringify(query)}`,
    {},
    token,
  );

const getAllReviews = (query, token) =>
  request.get(`/wcfmmp/v1/reviews?${queryString.stringify(query)}`, {}, token);

const getStore = (id, token) =>
  request.get(`/wcfmmp/v1/settings/id/${id}`, {}, token);

const getProfile = (query, token) =>
  request.get(
    `/wcfmmp/v1/user-profile${queryString.stringify(query)}`,
    {},
    token,
  );
const updateProfile = (id, data, token) =>
  request.put(
    `/mobile-builder/v1/customers/${id}`,
    JSON.stringify(data),
    token,
  );
const updateStore = (data = {}, token) =>
  request.post(
    '/mobile-builder/v1/wcfm-profile-settings',
    JSON.stringify(data),
    'POST',
    token,
  );

export default {
  getProducts,
  getOrders,
  addProduct,
  updateProduct,
  deleteProduct,
  updateOrders,
  getSales,
  getAllReviews,
  getDataReport,
  getStore,
  updateStore,
  getProfile,
  updateProfile,
  getCategories,
};
