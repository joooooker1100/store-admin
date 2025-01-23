import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";
import { getOrders } from "../api/apiClient";
import { Order } from "../types/apiTypes";

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const columns = [
    { title: "Order ID", dataIndex: "OrderID", key: "OrderID" },
    { title: "Order Date", dataIndex: "OrderDate", key: "OrderDate" },
    { title: "Customer ID", dataIndex: "CustomerID", key: "CustomerID" },
    {
      title: "Order Status ID",
      dataIndex: "OrderStatusID",
      key: "OrderStatusID",
    },
  ];

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Table
          columns={columns}
          dataSource={orders}
          loading={loading}
          rowKey="OrderID"
        />
      </Space>
    </div>
  );
};

export default OrderList;
