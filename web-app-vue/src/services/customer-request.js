import axios from 'axios';
import {
  API_BASE_URL
} from '../core/constant';

const PATH = 'client-requests';

export const getList = (params = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_BASE_URL}/${PATH}`,
      method: 'get',
      params: {
        results: 10,
        ...params,
      },
      type: 'json',
    }).then((result) => {
      if (result && result.data && result.data.data) {
        resolve(result.data.data);
      } else {
        resolve([]);
      }
    }).catch((err) => reject(err));
  })
}

export const getById = (id) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_BASE_URL}/${PATH}/${id}`,
      method: 'get',
      type: 'json'
    }).then((result) => {
      if (result && result.data && result.data.data) {
        resolve(result.data.data);
      } else {
        resolve();
      }
    }).catch((err) => reject(err));
  })
}

export const createOne = (payload) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_BASE_URL}/${PATH}`,
      method: 'post',
      data: payload,
      type: 'json',
    }).then((result) => {
      if (result && result.data && result.data.data) {
        resolve(result.data.data);
      } else {
        resolve();
      }
    }).catch((err) => reject(err));
  })
}

export const deleteOne = (id) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_BASE_URL}/${PATH}/${id}`,
      method: 'delete',
      type: 'json',
    }).then((result) => {
      if (result && result.data && result.data.data) {
        resolve(result.data.data);
      } else {
        resolve();
      }
    }).catch((err) => reject(err));
  })
}

export const updatePickupLocation = (id, payload) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_BASE_URL}/${PATH}/${id}/updatePickupLocation`,
      method: 'put',
      data: payload,
      type: 'json',
    }).then((result) => {
      if (result && result.data && result.data.data) {
        resolve(result.data.data);
      } else {
        resolve();
      }
    }).catch((err) => reject(err));
  })
}
