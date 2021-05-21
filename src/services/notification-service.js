import request from 'src/utils/fetch';
import queryString from 'qs';

export const getNotifications = (query, token) =>
  request.get(
    `/wcfmmp/v1/notifications?${queryString.stringify(query)}`,
    {},
    token,
  );
export const readNotification = (data, token) =>
  request.post(
    '/mobile-builder/v1/messages-mark-read',
    JSON.stringify(data),
    'POST',
    token,
  );
export const deleteNotification = (data, token) =>
  request.post(
    '/mobile-builder/v1/messages-delete',
    JSON.stringify(data),
    'POST',
    token,
  );
