import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form } from "antd";
import { OrderStatus } from "../types/apiTypes";
import {
  getOrderStatuses,
  createOrderStatus,
  deleteOrderStatus,
  updateOrderStatus,
} from "../api/apiClient";

const OrderStatusList = () => {
  const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingStatus, setEditingStatus] = useState<OrderStatus | null>(null);
  const [statusName, setStatusName] = useState<string>("");

  const fetchOrderStatuses = async () => {
    setLoading(true);
    const data = await getOrderStatuses();
    setOrderStatuses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrderStatuses(); 
  }, []);

  const handleCreate = async () => {
    if (statusName.trim()) {
      await createOrderStatus({
        Name: statusName,
        OrderStatusID: 0
      });
      setStatusName("");
      setIsModalVisible(false);
      fetchOrderStatuses(); 
    }
  };

  const handleEdit = (status: OrderStatus) => {
    setEditingStatus(status);
    setStatusName(status.Name);
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    if (editingStatus && statusName.trim()) {
      await updateOrderStatus(editingStatus.OrderStatusID, {
        Name: statusName,
        OrderStatusID: 0
      });
      setEditingStatus(null);
      setStatusName("");
      setIsModalVisible(false);
      fetchOrderStatuses(); 
    }
  };

  const handleDelete = async (statusId: number) => {
    await deleteOrderStatus(statusId);
    fetchOrderStatuses(); 
  };

  const columns = [
    {
      title: "Order Status",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: OrderStatus) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record.OrderStatusID)}
          >
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
        New Status
      </Button>

      <Table
        columns={columns}
        dataSource={orderStatuses}
        loading={loading}
        rowKey="OrderStatusID"
      />

      <Modal
        title={editingStatus ? "Edit Order Status" : "Create Order Status"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setStatusName("");
          setEditingStatus(null);
        }}
        onOk={editingStatus ? handleUpdate : handleCreate}
      >
        <Form>
          <Form.Item label="Status Name">
            <Input
              value={statusName}
              onChange={(e) => setStatusName(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderStatusList;
