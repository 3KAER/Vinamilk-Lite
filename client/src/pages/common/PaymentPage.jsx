import { useEffect, useState } from "react";
import axios from "axios";
import { paymentApi } from "../../api";
import Cart from "../../components/common/Cart";
import { MainLayout } from "../../components/layout";
import { useAuth } from "../../hooks";
import { Loading } from "../../components/common";
import Swal from "sweetalert2";
import { random } from "lodash";

const PaymentPage = () => {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState("");
  const [paymentData, setPaymentData] = useState({
    paymentMethod: "",
    extraData: "",
    amount: "0",
  });

  useEffect(() => {
    const handleResultPayment = async (params) => {
      try {
        const response = await paymentApi.resultPayment(params);
        console.log(response);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong!";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
        });
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    (async () => {
      const searchParams = new URLSearchParams(window.location.search);

      if (searchParams.has("partnerCode")) {
        const params = {};
        searchParams.forEach((value, key) => {
          params[key] = value;
        });
        await handleResultPayment(params);
        const url = new URL(window.location);
        url.search = "";
        window.history.replaceState({}, document.title, url.href);
      } else {
        setLoading(false);
      }
    })();
  }, []);

  const handleTotal = (total) => {
    setTotal(total);
  };

  useEffect(() => {
    if (total !== null) {
      setPaymentData((prevPaymentData) => ({
        ...prevPaymentData,
        amount: total,
      }));
    }
  }, [total]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await paymentApi.initPayment(paymentData);
      const data = JSON.parse(response?.data);
      if (data?.payUrl) {
        window.location.href = data.payUrl;
      } else {
        const errorMessage = response?.data?.message || "Something went wrong!";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    }
  };

  return (
    <MainLayout>
      <div className="container text-primary mx-auto px-4 my-8">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg text-primary font-semibold border-b border-primary pb-2 mb-4">
              Giỏ hàng
            </h3>
            <Cart
              handleCheckout={() => {}}
              onTotal={handleTotal}
              cartItems={[]}
              removeFromCart={() => {}}
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold border-b border-primary pb-2 mb-4">
              Phương thức thanh toán
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mt-5 grid gap-6">
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="payment_1"
                    type="radio"
                    name="paymentMethod"
                    value="payWithATM"
                    checked={paymentData.paymentMethod === "payWithATM"}
                    onChange={handleChange}
                  />
                  <span className="peer-checked:border-primary absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label
                    className="peer-checked:border-2 peer-checked:border-primary peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-primary-300 p-4"
                    htmlFor="payment_1"
                  >
                    <img
                      className="w-14 mx-2 object-contain"
                      src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-Napas.png" // Thay đổi đường dẫn hình ảnh theo logo của bạn
                      alt="ATM"
                    />
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">
                        Thanh toán qua thẻ tín dụng
                      </span>
                      <p className="text-slate-500 text-sm leading-6">
                        Sử dụng thẻ ngân hàng của bạn
                      </p>
                    </div>
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="payment_2"
                    type="radio"
                    name="paymentMethod"
                    value="payWithCC"
                    checked={paymentData.paymentMethod === "payWithCC"}
                    onChange={handleChange}
                  />
                  <span className="peer-checked:border-primary absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label
                    className="peer-checked:border-2 peer-checked:border-primary peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-primary-300 p-4"
                    htmlFor="payment_2"
                  >
                    <img
                      className="w-14 mx-2 object-contain"
                      src="https://readymadeui.com/images/visa.webp" // Thay đổi đường dẫn hình ảnh theo logo của bạn
                      alt="Credit Card"
                    />
                    <img
                      className="w-14 mx-2 object-contain"
                      src="https://readymadeui.com/images/master.webp" // Thay đổi đường dẫn hình ảnh theo logo của bạn
                      alt="Credit Card"
                    />
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">
                        Thanh toán qua credit card
                      </span>
                      <p className="text-slate-500 text-sm leading-6">
                        Sử dụng thẻ tín dụng của bạn
                      </p>
                    </div>
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="payment_3"
                    type="radio"
                    name="paymentMethod"
                    value="captureWallet"
                    checked={paymentData.paymentMethod === "captureWallet"}
                    onChange={handleChange}
                  />
                  <span className="peer-checked:border-primary absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label
                    className="peer-checked:border-2 peer-checked:border-primary peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-primary-300 p-4"
                    htmlFor="payment_3"
                  >
                    <img
                      className="w-14 mx-2 object-contain"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnV4cUM7jBauINof35Yn_unOz976Iz5okV8A&s" // Thay đổi đường dẫn hình ảnh theo logo của bạn
                      alt="QR Code"
                    />
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">
                        Thanh toán bằng QR
                      </span>
                      <p className="text-slate-500 text-sm leading-6">
                        Quét mã QR để thanh toán
                      </p>
                    </div>
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="payment_4"
                    type="radio"
                    name="paymentMethod"
                    value="cashOnDelivery"
                    checked={paymentData.paymentMethod === "cashOnDelivery"}
                    onChange={handleChange}
                  />
                  <span className="peer-checked:border-primary absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label
                    className="peer-checked:border-2 peer-checked:border-primary peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-primary-300 p-4"
                    htmlFor="payment_4"
                  >
                    <img
                      className="w-14 mx-2 object-contain"
                      src="https://cdn-icons-png.flaticon.com/512/2897/2897832.png" // Thay đổi đường dẫn hình ảnh theo logo của bạn
                      alt="Cash"
                    />
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">
                        Thanh toán khi nhận hàng
                      </span>
                      <p className="text-slate-500 text-sm leading-6">
                        Thanh toán bằng tiền mặt khi nhận hàng
                      </p>
                    </div>
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold border-t border-primary mt-4 mb-4 py-2">
                  Tổng số tiền cần thanh toán
                </h3>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={total + " ₫" || ""}
                  className="font-semibold outline-none border-none"
                  onChange={handleChange}
                  readOnly
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0213af] text-white p-2 rounded hover:bg-blue-700"
              >
                Thanh toán
              </button>
            </form>
          </div>
        </div>
      </div>
      {loading && <Loading fullScreen />}
    </MainLayout>
  );
};

export default PaymentPage;
