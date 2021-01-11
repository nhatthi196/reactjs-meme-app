import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';

const api = axios.create({
  baseURL: 'http://learning-reactjs.xyz/wp-api/wp-json/'
});

api.interceptors.request.use(config =>  {
  const token = localStorage.getItem(ACCESS_TOKEN) || '';
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, error => Promise.reject(error));

export default api;