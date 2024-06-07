import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VNM_API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
