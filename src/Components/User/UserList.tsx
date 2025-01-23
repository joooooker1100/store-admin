import React, { useEffect, useState } from "react";
import { Table, Button, Space } from "antd";
import { getUsers } from "../api/apiClient";
import { User } from "../types/apiTypes";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const columns = [
    { title: "User ID", dataIndex: "UserID", key: "UserID" },
    { title: "UserName", dataIndex: "UserName", key: "UserName" },
    { title: "Email", dataIndex: "Email", key: "Email" },
    { title: "Phone", dataIndex: "Phone", key: "Phone" },
    { title: "Role", dataIndex: "Role", key: "Role" },
  ];

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Button type="primary">Add New User</Button>
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          rowKey="UserID"
        />
      </Space>
    </div>
  );
};

export default UserList;
