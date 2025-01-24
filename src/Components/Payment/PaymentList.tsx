import React, { useEffect, useState } from "react";
import { Table, Space, Button, Modal, Input, Form } from "antd";
import { getPayments, createPayment, updatePayment, deletePayment } from "../api/apiClient";
import { Payment } from "../types/apiTypes";

const PaymentList = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [formData, setFormData] = useState<Payment>({
    PaymentID: 0,
    OrderID: 0,
    Amount: 0,
    PaymentDate: "",
    PaymentMethod: "",
  });


  useEffect(() => {
    const fetchPaymentsData = async () => {
      setLoading(true);
      const data = await getPayments();
      setPayments(data);
      setLoading(false);
    };
    fetchPaymentsData();
  }, []);


  const handleCreate = async () => {
    if (formData.OrderID && formData.Amount && formData.PaymentDate && formData.PaymentMethod) {
      const newPayment = await createPayment(formData); 
      setPayments([...payments, newPayment]);
      setIsModalVisible(false);
      setFormData({
        PaymentID: 0,
        OrderID: 0,
        Amount: 0,
        PaymentDate: "",
        PaymentMethod: "",
      }); 
    }
  };


  const handleEdit = (payment: Payment) => {
    setEditingPayment(payment); 
    setFormData(payment); 
    setIsModalVisible(true); 
  };

  const handleUpdate = async () => {
    if (editingPayment && formData.Amount && formData.PaymentDate && formData.PaymentMethod) {
      const updatedPayment = await updatePayment(editingPayment.PaymentID, formData); 
      setPayments(payments.map((payment) => (payment.PaymentID === updatedPayment.PaymentID ? updatedPayment : payment)));
      setEditingPayment(null);
      setIsModalVisible(false);
      setFormData({
        PaymentID: 0,
        OrderID: 0,
        Amount: 0,
        PaymentDate: "",
        PaymentMethod: "",
      });
    }
  };


  const handleDelete = async (paymentId: number) => {
    await deletePayment(paymentId); 
    setPayments(payments.filter((payment) => payment.PaymentID !== paymentId)); 
  };

  const columns = [
    { title: "Payment ID", dataIndex: "PaymentID", key: "PaymentID" },
    { title: "Order ID", dataIndex: "OrderID", key: "OrderID" },
    { title: "Amount", dataIndex: "Amount", key: "Amount" },
    { title: "Payment Date", dataIndex: "PaymentDate", key: "PaymentDate" },
    { title: "Payment Method", dataIndex: "PaymentMethod", key: "PaymentMethod" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Payment) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.PaymentID)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={() => setIsModalVisible(true)} 
      >
        New Payment
      </Button>

      <Table
        columns={columns}
        dataSource={payments}
        loading={loading}
        rowKey="PaymentID"
      />

      <Modal
        title={editingPayment ? "Edit Payment" : "Create Payment"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setFormData({
            PaymentID: 0,
            OrderID: 0,
            Amount: 0,
            PaymentDate: "",
            PaymentMethod: "",
          });
          setEditingPayment(null);
        }}
        onOk={editingPayment ? handleUpdate : handleCreate}
      >
        <Form>
          <Form.Item label="Order ID">
            <Input
              type="number"
              value={formData.OrderID}
              onChange={(e) => setFormData({ ...formData, OrderID: +e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Amount">
            <Input
              type="number"
              value={formData.Amount}
              onChange={(e) => setFormData({ ...formData, Amount: +e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Payment Date">
            <Input
              type="date"
              value={formData.PaymentDate}
              onChange={(e) => setFormData({ ...formData, PaymentDate: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Payment Method">
            <Input
              value={formData.PaymentMethod}
              onChange={(e) => setFormData({ ...formData, PaymentMethod: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PaymentList;
