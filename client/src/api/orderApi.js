import axiosClient from "./axiosClient";

const orderApi = {
  getOrders(paramString = "") {
    return axiosClient.get(`/account/orders?${paramString}`);
  },
};

export default orderApi;
