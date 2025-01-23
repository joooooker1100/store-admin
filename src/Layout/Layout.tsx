import "../App.css";
import { Layout, Menu, Avatar, Typography } from "antd";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/order-statuses">Order Statuses</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/order-report">Report</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/payment-methods">Payment Methods</Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/purchase-invoices">Purchase Invoices</Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link to="/purchase-invoice-details">Purchase Invoice Details</Link>
          </Menu.Item>
          <Menu.Item key="10">
            <Link to="/categories">Categories</Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link to="/payments">Payments</Link>
          </Menu.Item>
          <Menu.Item key="12">
            <Link to="/orders">Orders</Link>
          </Menu.Item>
          <Menu.Item key="13">
            <Link to="/suppliers">Suppliers</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-background"
          style={{ padding: 0, position: "relative" }}
        >
          <div className="header-content">
            <Title level={4} style={{ color: "white" }}>
              Fitcat Admin
            </Title>
          </div>
        </Header>
        <Content style={{ margin: "10px 16px" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>Fitcat ©2023</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
