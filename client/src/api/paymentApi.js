import axiosClient from "./axiosClient";

const paymentApi = {
  initPayment(data) {
    return axiosClient.post("/payment", data);
  },
  resultPayment(data) {
    return axiosClient.post("/payment/result", data);
  },
};

export default paymentApi;
