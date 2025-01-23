import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { OrderStatus } from "../types/apiTypes";
import { getOrderStatuses } from "../api/apiClient";

const OrderStatusListPage = () => {
  const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrderStatuses = async () => {
      const data = await getOrderStatuses();
      setOrderStatuses(data);
      setLoading(false);
    };
    fetchOrderStatuses();
  }, []);

  const columns = [{ title: "Order Status", dataIndex: "Name", key: "Name" }];

  return (
    <div>
      <Button type="primary" style={{ marginBottom: 20 }}>
        New Status
      </Button>
      <Table
        columns={columns}
        dataSource={orderStatuses}
        loading={loading}
        rowKey="OrderStatusID"
      />
    </div>
  );
};

export default OrderStatusListPage;
