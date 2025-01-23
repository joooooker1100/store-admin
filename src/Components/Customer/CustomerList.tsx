import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space } from "antd";
import { Customer } from "../types/apiTypes";
import { getCustomers } from "../api/apiClient";
import { PlusOutlined } from "@ant-design/icons";

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await getCustomers();
      setCustomers(data);
      setLoading(false);
    };
    fetchCustomers();
  }, []);

  const columns = [
    { title: "Customer Name", dataIndex: "CustomerName", key: "CustomerName" },
    { title: "Email", dataIndex: "Email", key: "Email" },
    { title: "Phone", dataIndex: "Phone", key: "Phone" },
    { title: "Address", dataIndex: "Address", key: "Address" },
  ];

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input.Search
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={(value) => setSearchQuery(value)}
          style={{ marginBottom: 20 }}
        />
        <Button
          icon={<PlusOutlined />}
          type="primary"
          style={{ marginBottom: 20 }}
        >
          New Customer
        </Button>
        <Table
          columns={columns}
          dataSource={customers.filter(
            (customer) =>
              customer.CustomerName.includes(searchQuery) ||
              customer.Email.includes(searchQuery)
          )}
          loading={loading}
          rowKey="CustomerID"
        />
      </Space>
    </div>
  );
};

export default CustomerList;
