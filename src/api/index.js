import axios from 'axios';

export const API = axios.create({
  // baseURL: 'https://api.astropath.co.in',
  // baseURL: 'http:/10.0.2.2:8000/',
  baseURL: 'http://143.110.191.190:8000',
});
