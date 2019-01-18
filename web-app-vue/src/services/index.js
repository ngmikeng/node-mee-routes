import axios from 'axios';
import Cookies from 'js-cookie';
import router from '../router';
import {
  API_BASE_URL
} from '../core/constant';

// Response interceptor
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response) {
    // redirect to login
    if (error.response.status === 401) {
      router.push({ path: '/login' });
    }

  }
  return Promise.reject(error);
});

export function apiService(opts = { path: '/', method: 'get' }) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_BASE_URL}${opts.path}`,
      ...opts
    }).then((result) => {
      resolve(result.data);
    }).catch((err) => {
      if (err && err.response && err.response.data) {
        reject(err.response.data);
      } else {
        reject(err);
      }
    })
  })
}

export function setAuthHeader(authToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}

export function setUserInfo(data) {
  if (data) {
    Cookies.set('id', data.id, { expires: 30 });
    Cookies.set('accessToken', data.token, { expires: 30 });
  }
}

export function getUserInfo() {
  const id = Cookies.get('id');
  const accessToken = Cookies.get('accessToken');

  return {
    id, accessToken
  }
}

export function removeUserInfo() {
  Cookies.remove('id');
  Cookies.remove('accessToken');
}
