import React, { useEffect, useState } from "react";
import {
  getPurchaseInvoices,
  createPurchaseInvoice,
  updatePurchaseInvoice,
  deletePurchaseInvoice,
} from "../api/apiClient";
import { PurchaseInvoice } from "../types/apiTypes";
import { Table, Button, Modal, Input, Form, Space } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const PurchaseInvoiceList: React.FC = () => {
  const [purchaseInvoices, setPurchaseInvoices] = useState<PurchaseInvoice[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPurchaseInvoice, setEditingPurchaseInvoice] =
    useState<PurchaseInvoice | null>(null);

  const fetchPurchaseInvoices = async () => {
    setLoading(true);
    try {
      const data = await getPurchaseInvoices();
      setPurchaseInvoices(data);
    } catch (error) {
      console.error("Error fetching purchase invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseInvoices();
  }, []);

  const handleCreateOrUpdate = async (values: Partial<PurchaseInvoice>) => {
    try {
      if (editingPurchaseInvoice) {
        await updatePurchaseInvoice(
          editingPurchaseInvoice.PurchaseInvoiceID,
          values
        );
      } else {
        await createPurchaseInvoice(
          values as Omit<PurchaseInvoice, "PurchaseInvoiceID">
        );
      }
      fetchPurchaseInvoices();
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving purchase invoice:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePurchaseInvoice(id);
      fetchPurchaseInvoices();
    } catch (error) {
      console.error("Error deleting purchase invoice:", error);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "PurchaseInvoiceID", key: "PurchaseInvoiceID" },
    {
      title: "Invoice Number",
      dataIndex: "InvoiceNumber",
      key: "InvoiceNumber",
    },
    { title: "Date", dataIndex: "InvoiceDate", key: "InvoiceDate" },
    { title: "Amount", dataIndex: "TotalAmount", key: "TotalAmount" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: PurchaseInvoice) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingPurchaseInvoice(record);
              setModalVisible(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.PurchaseInvoiceID)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => {
          setEditingPurchaseInvoice(null);
          setModalVisible(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Add Purchase Invoice
      </Button>
      <Table
        dataSource={purchaseInvoices}
        columns={columns}
        loading={loading}
        rowKey="PurchaseInvoiceID"
      />
      <Modal
        title={
          editingPurchaseInvoice
            ? "Edit Purchase Invoice"
            : "Add Purchase Invoice"
        }
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={editingPurchaseInvoice || {}}
          onFinish={handleCreateOrUpdate}
          layout="vertical"
        >
          <Form.Item
            label="Invoice Number"
            name="InvoiceNumber"
            rules={[{ required: true, message: "Please enter invoice number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date"
            name="InvoiceDate"
            rules={[{ required: true, message: "Please enter invoice date" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Total Amount"
            name="TotalAmount"
            rules={[{ required: true, message: "Please enter total amount" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PurchaseInvoiceList;
