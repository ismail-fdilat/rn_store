import request from 'src/utils/fetch';
import queryString from 'qs';

const getProducts = (query, token) =>
  request.get(`/dokan/v1/products?${queryString.stringify(query)}`, {}, token);

const addProduct = (data, token) => {
  const {image, ...rest} = data;
  const dataAdd = {
    ...rest,
    images: [
      {
        src: image,
      },
    ],
  };
  return request.post(
    '/dokan/v1/products',
    JSON.stringify(dataAdd),
    'POST',
    token,
  );
};

const updateProduct = (productId, data, token) => {
  const {image, ...rest} = data;
  const dataUpdate = {
    ...rest,
    images: [
      {
        src: image,
      },
    ],
  };
  return request.put(
    `/dokan/v1/products/${productId}`,
    JSON.stringify(dataUpdate),
    token,
  );
};

const deleteProduct = (id, token) =>
  request.delete(`/dokan/v1/products/${id}`, {}, token);

const getOrders = (query, token) =>
  request.get(`/dokan/v1/orders?${queryString.stringify(query)}`, {}, token);

const updateOrders = (idOrder, data, token) =>
  request.put(`/dokan/v1/orders/${idOrder}`, JSON.stringify(data), token);

const getDataReport = (query, token) =>
  request.get(
    `/mobile-builder/v1/wcfm-report-chart${queryString.stringify(query)}`,
    {},
    token,
  );

const getStore = (id, token) =>
  request.get(`/wcfmmp/v1/settings/id/${id}`, {}, token);

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
  getDataReport,
  getStore,
  updateStore,
};
