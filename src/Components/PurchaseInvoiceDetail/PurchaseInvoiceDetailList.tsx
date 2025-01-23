import React, { useEffect, useState } from "react";
import {
  getPurchaseInvoiceDetails,
  createPurchaseInvoiceDetail,
  updatePurchaseInvoiceDetail,
  deletePurchaseInvoiceDetail,
} from "../api/apiClient";
import { PurchaseInvoiceDetail } from "../types/apiTypes";
import { Table, Button, Modal, Input, Form, Space } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const PurchaseInvoiceDetailList: React.FC = () => {
  const [purchaseInvoiceDetails, setPurchaseInvoiceDetails] = useState<
    PurchaseInvoiceDetail[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPurchaseInvoiceDetail, setEditingPurchaseInvoiceDetail] =
    useState<PurchaseInvoiceDetail | null>(null);

  const fetchPurchaseInvoiceDetails = async () => {
    setLoading(true);
    try {
      const data = await getPurchaseInvoiceDetails();
      setPurchaseInvoiceDetails(data);
    } catch (error) {
      console.error("Error fetching purchase invoice details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseInvoiceDetails();
  }, []);

  const handleCreateOrUpdate = async (
    values: Partial<PurchaseInvoiceDetail>
  ) => {
    try {
      if (editingPurchaseInvoiceDetail) {
        await updatePurchaseInvoiceDetail(
          editingPurchaseInvoiceDetail.PurchaseInvoiceDetailID,
          values
        );
      } else {
        await createPurchaseInvoiceDetail(
          values as Omit<PurchaseInvoiceDetail, "PurchaseInvoiceDetailID">
        );
      }
      fetchPurchaseInvoiceDetails();
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving purchase invoice detail:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePurchaseInvoiceDetail(id);
      fetchPurchaseInvoiceDetails();
    } catch (error) {
      console.error("Error deleting purchase invoice detail:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "PurchaseInvoiceDetailID",
      key: "PurchaseInvoiceDetailID",
    },
    {
      title: "Invoice ID",
      dataIndex: "PurchaseInvoiceID",
      key: "PurchaseInvoiceID",
    },
    { title: "Product ID", dataIndex: "ProductID", key: "ProductID" },
    { title: "Quantity", dataIndex: "Quantity", key: "Quantity" },
    { title: "Price", dataIndex: "Price", key: "Price" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: PurchaseInvoiceDetail) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingPurchaseInvoiceDetail(record);
              setModalVisible(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.PurchaseInvoiceDetailID)}
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
          setEditingPurchaseInvoiceDetail(null);
          setModalVisible(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Add Purchase Invoice Detail
      </Button>
      <Table
        dataSource={purchaseInvoiceDetails}
        columns={columns}
        loading={loading}
        rowKey="PurchaseInvoiceDetailID"
      />
      <Modal
        title={
          editingPurchaseInvoiceDetail
            ? "Edit Purchase Invoice Detail"
            : "Add Purchase Invoice Detail"
        }
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={editingPurchaseInvoiceDetail || {}}
          onFinish={handleCreateOrUpdate}
          layout="vertical"
        >
          <Form.Item
            label="Product ID"
            name="ProductID"
            rules={[{ required: true, message: "Please enter product ID" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="Quantity"
            rules={[{ required: true, message: "Please enter quantity" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="Price"
            rules={[{ required: true, message: "Please enter price" }]}
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

export default PurchaseInvoiceDetailList;
