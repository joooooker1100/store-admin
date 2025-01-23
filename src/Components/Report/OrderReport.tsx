import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";
import { Report } from "../types/apiTypes";
import { getOrderReport } from "../api/apiClient";

const OrderReport = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReports = async () => {
      const data = await getOrderReport();
      setReports(data);
      setLoading(false);
    };
    fetchReports();
  }, []);

  const columns = [
    { title: "Customer Name", dataIndex: "CustomerName", key: "CustomerName" },
    { title: "Order Status", dataIndex: "OrderStatus", key: "OrderStatus" },
    { title: "Total Orders", dataIndex: "TotalOrders", key: "TotalOrders" },
    {
      title: "Total Quantity",
      dataIndex: "TotalQuantity",
      key: "TotalQuantity",
    },
    { title: "Total Sales", dataIndex: "TotalSales", key: "TotalSales" },
  ];

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Table
          columns={columns}
          dataSource={reports}
          loading={loading}
          rowKey="CustomerName"
        />
      </Space>
    </div>
  );
};

export default OrderReport;
