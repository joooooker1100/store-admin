import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";
import { getPayments } from "../api/apiClient";
import { Payment } from "../types/apiTypes";

const PaymentList = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPayments = async () => {
      const data = await getPayments();
      setPayments(data);
      setLoading(false);
    };
    fetchPayments();
  }, []);

  const columns = [
    { title: "Payment ID", dataIndex: "PaymentID", key: "PaymentID" },
    { title: "Order ID", dataIndex: "OrderID", key: "OrderID" },
    { title: "Amount", dataIndex: "Amount", key: "Amount" },
    { title: "Payment Date", dataIndex: "PaymentDate", key: "PaymentDate" },
    {
      title: "Payment Method",
      dataIndex: "PaymentMethod",
      key: "PaymentMethod",
    },
  ];

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Table
          columns={columns}
          dataSource={payments}
          loading={loading}
          rowKey="PaymentID"
        />
      </Space>
    </div>
  );
};

export default PaymentList;
