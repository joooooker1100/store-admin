import React, { useEffect, useState } from "react";
import {
  getPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} from "../api/apiClient";
import { PaymentMethod } from "../types/apiTypes";
import { Table, Button, Modal, Input, Form, Space } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const PaymentMethodList: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPaymentMethod, setEditingPaymentMethod] =
    useState<PaymentMethod | null>(null);

  const fetchPaymentMethods = async () => {
    setLoading(true);
    try {
      const data = await getPaymentMethods();
      setPaymentMethods(data);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const handleCreateOrUpdate = async (values: Partial<PaymentMethod>) => {
    try {
      if (editingPaymentMethod) {
        await updatePaymentMethod(editingPaymentMethod.PaymentMethodID, values);
      } else {
        await createPaymentMethod(
          values as Omit<PaymentMethod, "PaymentMethodID">
        );
      }
      fetchPaymentMethods();
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving payment method:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePaymentMethod(id);
      fetchPaymentMethods();
    } catch (error) {
      console.error("Error deleting payment method:", error);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "PaymentMethodID", key: "PaymentMethodID" },
    { title: "Method Name", dataIndex: "MethodName", key: "MethodName" },
    { title: "Description", dataIndex: "Description", key: "Description" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: PaymentMethod) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingPaymentMethod(record);
              setModalVisible(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.PaymentMethodID)}
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
          setEditingPaymentMethod(null);
          setModalVisible(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Add Payment Method
      </Button>
      <Table
        dataSource={paymentMethods}
        columns={columns}
        loading={loading}
        rowKey="PaymentMethodID"
      />
      <Modal
        title={
          editingPaymentMethod ? "Edit Payment Method" : "Add Payment Method"
        }
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={editingPaymentMethod || {}}
          onFinish={handleCreateOrUpdate}
          layout="vertical"
        >
          <Form.Item
            label="Method Name"
            name="MethodName"
            rules={[
              { required: true, message: "Please enter payment method name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea />
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

export default PaymentMethodList;
