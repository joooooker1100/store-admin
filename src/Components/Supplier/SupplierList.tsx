import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";
import { getSuppliers } from "../api/apiClient";
import { Supplier } from "../types/apiTypes";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const data = await getSuppliers();
      setSuppliers(data);
      setLoading(false);
    };
    fetchSuppliers();
  }, []);

  const columns = [
    { title: "Supplier ID", dataIndex: "SupplierID", key: "SupplierID" },
    { title: "Supplier Name", dataIndex: "SupplierName", key: "SupplierName" },
    { title: "Phone", dataIndex: "Phone", key: "Phone" },
    { title: "Address", dataIndex: "Address", key: "Address" },
  ];

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Table
          columns={columns}
          dataSource={suppliers}
          loading={loading}
          rowKey="SupplierID"
        />
      </Space>
    </div>
  );
};

export default SupplierList;
