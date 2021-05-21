import request from 'src/utils/fetch';

export const loginWithEmail = (data) =>
  request.post('/mobile-builder/v1/login', data);

export const registerEmail = (data) =>
  request.post('/mobile-builder/v1/register', data);

export const settingProfile = (data, token) =>
  request.post('/mobile-builder/v1/wcfm-profile-settings', data, 'POST', token);

export const forgotPassword = (data) =>
  request.post('/mobile-builder/v1/lost-password', JSON.stringify(data));
