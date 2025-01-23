import React, { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/apiClient";
import { Category } from "../types/apiTypes";
import { Table, Button, Modal, Input, Form, Space } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateOrUpdate = async (values: Partial<Category>) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.CategoryID, values);
      } else {
        await createCategory(values as Omit<Category, "CategoryID">);
      }
      fetchCategories();
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "CategoryID", key: "CategoryID" },
    { title: "Name", dataIndex: "CategoryName", key: "CategoryName" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Category) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingCategory(record);
              setModalVisible(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.CategoryID)}
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
          setEditingCategory(null);
          setModalVisible(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Add Category
      </Button>
      <Table
        dataSource={categories}
        columns={columns}
        loading={loading}
        rowKey="CategoryID"
      />
      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={editingCategory || {}}
          onFinish={handleCreateOrUpdate}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="CategoryName"
            rules={[{ required: true, message: "Please enter category name" }]}
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

export default CategoryList;
