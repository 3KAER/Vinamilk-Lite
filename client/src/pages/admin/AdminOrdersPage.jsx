import { AdminLayout } from "../../components/layout";
import React, { useState, useEffect } from "react";
import productImageApi from "../../api/productImageApi";
import productApi from "../../api/productApi";
import orderApi from "../../api/orderApi";

const fetchProductImages = async (param) => {
  try {
    const response = await productImageApi.getProductImages(param);
    if (response.data && response.data.rows) {
      return response.data.rows[0].src;
    } else {
      console.error(
        "Không tìm thấy URL hình ảnh trong phản hồi:",
        response.data
      );
      return "/images/default-image.jpg";
    }
  } catch (error) {
    console.error("Lỗi khi lấy hình ảnh sản phẩm:", error);
    return "/images/default-image.jpg";
  }
};

const fetchProductName = async (param) => {
  try {
    const response = await productApi.getProducts(param);

    if (response.data && response.data.rows) {
      return response.data.rows[0].name;
    } else {
      console.error(
        "Không tìm thấy tên sản phẩm trong phản hồi:",
        response.data
      );
      return "Tên sản phẩm không có sẵn";
    }
  } catch (error) {
    console.error("Lỗi khi lấy tên sản phẩm:", error);
    return "Tên sản phẩm không có sẵn";
  }
};

function AdminOrdersPage() {
  const [orderList, setOrderList] = useState([]);
  const [images, setImages] = useState({});
  const [names, setNames] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await orderApi.getOrders();
      const orders = response.success[0].rows;
      setOrderList(orders);
      const imageMap = {};
      const nameMap = {};
      const productIds = [...new Set(orders.map((order) => order.product_id))];

      await Promise.all(
        productIds.map(async (productId) => {
          if (!imageMap[productId]) {
            const imageUrl = await fetchProductImages(
              `product_id=${productId}`
            );
            imageMap[productId] = imageUrl;
          }
          if (!nameMap[productId]) {
            const productName = await fetchProductName(`id=${productId}`);
            nameMap[productId] = productName;
          }
        })
      );

      setImages(imageMap);
      setNames(nameMap);
    };

    fetchDetails();
  }, []);

  const groupedOrders = orderList.reduce((acc, order) => {
    if (!acc[order.order_id]) {
      acc[order.order_id] = [];
    }
    acc[order.order_id].push(order);
    return acc;
  }, {});

  const calculateTotalPrice = (orders) => {
    return orders.reduce(
      (total, order) => total + order.price * order.quantity,
      0
    );
  };

  const handleViewDetails = (orderId) => {
    setSelectedOrder(orderId);
  };

  const closePopup = () => {
    setSelectedOrder(null);
  };

  const handlePopupClick = (event) => {
    if (event.target.classList.contains("popup-overlay")) {
      closePopup();
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto py-10">
        <h2 className="text-3xl font-bold text-primary mb-6">
          Quản lý đơn hàng
        </h2>
        <div className="bg-cream shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-transparent table-fixed">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left text-gray-700 border-blue-500 border-b-2">
                  Tên đơn hàng
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-700 border-blue-500 border-b-2">
                  Tổng giá
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-700 border-blue-500 border-b-2">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedOrders).map((orderId) => {
                const orders = groupedOrders[orderId];
                const totalPrice = calculateTotalPrice(orders);
                return (
                  <tr
                    key={orderId}
                    className="hover:bg-gray-200 hover:bg-opacity-50"
                  >
                    <td className="py-2 px-4 border-b text-left text-primary">
                      Đơn hàng {orderId}
                    </td>
                    <td className="py-2 px-4 border-b text-left text-primary">
                      {totalPrice}₫
                    </td>
                    <td className="py-2 px-4 border-b text-left">
                      <button
                        onClick={() => handleViewDetails(orderId)}
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {selectedOrder && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 popup-overlay z-50"
              onClick={handlePopupClick}
            >
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full relative">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  Chi tiết đơn hàng {selectedOrder}
                </h3>
                <button
                  onClick={closePopup}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
                >
                  &times;
                </button>
                <table className="min-w-full bg-transparent table-fixed">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left text-gray-700 border-blue-500 border-b-2">
                        Tên sản phẩm
                      </th>
                      <th className="py-2 px-4 border-b text-left text-gray-700 border-blue-500 border-b-2">
                        Hình ảnh
                      </th>
                      <th className="py-2 px-4 border-b text-left text-gray-700 border-blue-500 border-b-2">
                        Số lượng
                      </th>
                      <th className="py-2 px-4 border-b text-left text-gray-700 border-blue-500 border-b-2">
                        Giá
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedOrders[selectedOrder].map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-200 hover:bg-opacity-50"
                      >
                        <td className="py-2 px-4 border-b text-left text-primary">
                          {names[order.product_id] || "Đang tải..."}
                        </td>
                        <td className="py-2 px-4 border-b text-left">
                          <img
                            src={
                              images[order.product_id] ||
                              "/images/default-image.jpg"
                            }
                            alt={order.product_id}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </td>
                        <td className="py-2 px-4 border-b text-center text-primary">
                          {order.quantity}
                        </td>
                        <td className="py-2 px-4 border-b text-left text-primary">
                          {order.price}₫
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td
                        colSpan="3"
                        className="py-2 px-4 text-left font-semibold text-primary"
                      >
                        Tổng giá đơn hàng:
                      </td>
                      <td className="py-2 px-4 text-right font-semibold text-primary">
                        {calculateTotalPrice(groupedOrders[selectedOrder])}₫
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminOrdersPage;
