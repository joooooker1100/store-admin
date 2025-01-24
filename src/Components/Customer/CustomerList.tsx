import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space, Popconfirm, message } from "antd";
import { Customer } from "../types/apiTypes";
import { getCustomers, deleteCustomer } from "../api/apiClient";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);
      setLoading(false);
    };
    fetchCustomers();
  }, []);

  const handleDelete = async (customerId: number) => {
    try {
      setLoading(true);
      await deleteCustomer(customerId);
      setCustomers((prev) =>
        prev.filter((customer) => customer.CustomerID !== customerId)
      );
      message.success("Customer deleted successfully!");
    } catch (error) {
      message.error("Failed to delete customer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Customer Name", dataIndex: "CustomerName", key: "CustomerName" },
    { title: "Email", dataIndex: "Email", key: "Email" },
    { title: "Phone", dataIndex: "Phone", key: "Phone" },
    { title: "Address", dataIndex: "Address", key: "Address" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Customer) => (
        <Popconfirm
          title="Are you sure you want to delete this customer?"
          onConfirm={() => handleDelete(Number(record.CustomerID))}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
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
          <Link to="/customers/create">New Customer</Link>
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
