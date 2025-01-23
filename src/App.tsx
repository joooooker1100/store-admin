import Layout from "./Layout/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./Assets/css/styles.css";
import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
import CustomerList from "Components/Customer/CustomerList";
import OrderStatusList from "Components/OrderStatus/OrderStatusList";
import ProductList from "Components/Product/ProductList";
import OrderReport from "Components/Report/OrderReport";
import UserList from "Components/User/UserList";
import PaymentMethodList from "Components/PaymentMethod/PaymentMethodList";
import PurchaseInvoiceList from "Components/PurchaseInvoice/PurchaseInvoiceList";
import PurchaseInvoiceDetailList from "Components/PurchaseInvoiceDetail/PurchaseInvoiceDetailList";
import CategoryList from "Components/Category/CategoryList";
import PaymentList from "Components/Payment/PaymentList";
import OrderList from "Components/Order/OrderList";
import SupplierList from "Components/Supplier/SupplierList";

export interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
  id?: string;
  anonymous?: boolean;
}

const routes: RouteObject[] = [
  {
    path: "/panel",
    element: <Layout />,
    anonymous: true,
    children: [
      {
        id: "customers",
        path: "/panel/customers",
        element: <CustomerList />,
      },
      {
        id: "OrderStatusList",
        path: "/panel/order-statuses",
        element: <OrderStatusList />,
      },
      {
        id: "ProductList",
        path: "/panel/products",
        element: <ProductList />,
      },
      {
        id: "OrderReport",
        path: "/panel/order-report",
        element: <OrderReport />,
      },
      {
        id: "UserList",
        path: "/panel/users",
        element: <UserList />,
      },
      {
        id: "PaymentMethodList",
        path: "/panel/payment-methods",
        element: <PaymentMethodList />,
      },
      {
        id: "PurchaseInvoiceList",
        path: "/panel/purchase-invoices",
        element: <PurchaseInvoiceList />,
      },
      {
        id: "PurchaseInvoiceDetailList",
        path: "/panel/purchase-invoice-details",
        element: <PurchaseInvoiceDetailList />,
      },
    ],
  },
];

function App() {
  useEffect(() => {
    ConfigProvider.config({
      theme: { primaryColor: "red" },
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="customers" element={<CustomerList />} />
          <Route path="order-statuses" element={<OrderStatusList />} />
          <Route path="products" element={<ProductList />} />
          <Route path="order-report" element={<OrderReport />} />
          <Route path="users" element={<UserList />} />
          <Route path="payment-methods" element={<PaymentMethodList />} />
          <Route path="purchase-invoices" element={<PurchaseInvoiceList />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="payments" element={<PaymentList />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="suppliers" element={<SupplierList />} />
          <Route
            path="purchase-invoice-details"
            element={<PurchaseInvoiceDetailList />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
