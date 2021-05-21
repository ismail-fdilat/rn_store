import request from 'src/utils/fetch';
import queryString from 'qs';

export const getImages = (query, token) =>
  request.get(`/wp/v2/media?${queryString.stringify(query)}`, {}, token);
export const updateImages = (data, token) =>
  request.post('/wp/v2/media', data, 'POST', token);
