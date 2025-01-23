export interface Category {
  CategoryID: number;
  CategoryName: string;
}

export interface User {
  EmployeeID: number;
  EmployeeName: string;
  Position: string;
  Phone: string;
  Email: string;
}

export interface Customer {
  CustomerID: number;
  CustomerName: string;
  Email: string;
  Phone: string;
  Address: string;
}

export interface OrderStatus {
  OrderStatusID: number;
  Name: string;
}

export interface Product {
  ProductID: number;
  ProductName: string;
  Price: number;
  Stock: number;
  Description: string;
  CategoryID: number;
  EmployeeID: number;
}

export interface Order {
  OrderID: number;
  OrderDate: string;
  CustomerID: number;
  OrderStatusID: number;
}

export interface OrderDetail {
  OrderDetailID: number;
  OrderID: number;
  ProductID: number;
  Quantity: number;
  UnitPrice: number;
  Discount: number;
}

export interface Payment {
  PaymentID: number;
  OrderID: number;
  Amount: number;
  PaymentDate: string;
  PaymentMethod: string;
}

export interface Supplier {
  SupplierID: number;
  SupplierName: string;
  Phone: string;
  Address: string;
}

export interface SupplierProduct {
  SupplierProductID: number;
  SupplierID: number;
  ProductID: number;
  DeliveryDate: string;
}

export interface PurchaseInvoice {
  InvoiceID: number;
  SupplierID: number;
  InvoiceDate: string;
  TotalAmount: number;
}

export interface PurchaseInvoiceDetail {
  InvoiceDetailID: number;
  InvoiceID: number;
  ProductID: number;
  Quantity: number;
  UnitPrice: number;
}

export interface Report {
  CustomerName: string;
  OrderStatus: string;
  TotalOrders: number;
  TotalQuantity: number;
  TotalSales: number;
}

export interface Category {
  CategoryID: number;
  CategoryName: string;
  Description: string;
}

export interface PaymentMethod {
  PaymentMethodID: number;
  MethodName: string;
  Description: string;
}

export interface PurchaseInvoice {
  PurchaseInvoiceID: number;
  SupplierID: number;
  InvoiceDate: string;
  TotalAmount: number;
}

export interface PurchaseInvoiceDetail {
  PurchaseInvoiceDetailID: number;
  PurchaseInvoiceID: number;
  ProductID: number;
  Quantity: number;
  UnitPrice: number;
}
