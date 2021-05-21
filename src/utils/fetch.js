import {API} from 'src/configs/constant';
import includes from 'lodash/includes';
function generalUrl(url) {
  const baseURL = API + '/wp-json' + url;
  return {
    baseURL,
  };
}

const get = (url, options = {}, token = null) => {
  return new Promise((resolve, reject) => {
    const {baseURL} = generalUrl(url);
    const contentType = 'application/json';
    console.log(baseURL);
    fetch(baseURL, {
      ...options,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': contentType,
        Authorization: token ? `Bearer ${token}` : null,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code) {
          reject(new Error(data.message));
        } else {
          resolve(data);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const post = (url, data, method = 'POST', token) => {
  return new Promise((resolve, reject) => {
    const {baseURL} = generalUrl(url);
    const contentType = includes(url, 'media')
      ? 'multipart/form-data'
      : 'application/json';
    fetch(baseURL, {
      method: method,
      headers: {
        Accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : null,
        'Content-Type': contentType,
      },
      body: data,
    })
      .then((res) => res.json())
      .then((dataApi) => {
        if (dataApi.code) {
          reject(new Error(dataApi.message));
        } else {
          resolve(dataApi);
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export default {
  get,
  post,
  put: (url, data, token) => post(url, data, 'PUT', token),
  delete: (url, data, token) => post(url, data, 'DELETE', token),
};
