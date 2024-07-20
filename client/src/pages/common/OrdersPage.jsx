import React, { useState, useEffect } from "react";
import { AccountLayout } from "../../components/layout";
import { authApi } from "../../api";
import { OrderList } from "../../components/common";

function OrdersPage() {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await authApi.getOrders();
        const orderData = response.success[0];

        if (orderData) {
          setOrderList(orderData);
        } else {
          setOrderList([]); // Hoặc xử lý khi không có dữ liệu
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
        setError(error.message || "Lỗi khi lấy danh sách đơn hàng");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <AccountLayout>
        <div className="text-primary text-center py-6">
          <p>Đang tải dữ liệu...</p>
        </div>
      </AccountLayout>
    );
  }

  if (error) {
    return (
      <AccountLayout>
        <div className="text-primary text-center py-6">
          <p>{error}</p>
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout>
      <div className="text-primary">
        <h3 className="py-2 font-vs-std font-semibold text-[2rem] sm:text-[1.7rem] border-b border-primary">
          Đơn hàng
        </h3>
        <OrderList orderList={orderList} />
      </div>
    </AccountLayout>
  );
}

export default OrdersPage;
