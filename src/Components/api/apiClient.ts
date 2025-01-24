import axios, { AxiosInstance } from "axios";
import {
  Customer,
  OrderStatus,
  Product,
  Report,
  Payment,
  Supplier,
  SupplierProduct,
  User,
  Order,
  PurchaseInvoiceDetail,
  PurchaseInvoice,
  PaymentMethod,
  Category,
} from "../types/apiTypes";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3100",
  timeout: 5000,
});
export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get("/users");
  return data;
};
export const getUserById = async (id: number): Promise<User> => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

export const createUser = async (user: Omit<User, "UserID">): Promise<User> => {
  const { data } = await api.post("/users", user);
  return data;
};

export const updateUser = async (
  id: number,
  user: Partial<User>
): Promise<User> => {
  const { data } = await api.patch(`/users/${id}`, user);
  return data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
export const getOrders = async (): Promise<Order[]> => {
  const { data } = await api.get("/orders");
  return data;
};

export const getOrderById = async (id: number): Promise<Order> => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

export const createOrder = async (
  order: Omit<Order, "OrderID">
): Promise<Order> => {
  const { data } = await api.post("/orders", order);
  return data;
};

export const updateOrder = async (
  id: number,
  order: Partial<Order>
): Promise<Order> => {
  const { data } = await api.patch(`/orders/${id}`, order);
  return data;
};

export const deleteOrder = async (id: number): Promise<void> => {
  await api.delete(`/orders/${id}`);
};
export const getCustomers = async (): Promise<Customer[]> => {
  const { data } = await api.get("/customer");
  return data;
};

export const getCustomerById = async (
  customerId: number
): Promise<Customer> => {
  const { data } = await api.get(`/customer/${customerId}`);
  return data;
};

export const getOrderStatuses = async (): Promise<OrderStatus[]> => {
  const { data } = await api.get("/order-status");
  return data;
};

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get("/product");
  return data;
};

export const getOrderReport = async (): Promise<Report[]> => {
  const { data } = await api.get("/report");
  return data;
};

export const createCustomer = async (customer: Customer): Promise<Customer> => {
  const { data } = await api.post("/customer", customer);
  return data;
};

export const createOrderStatus = async (
  orderStatus: OrderStatus
): Promise<OrderStatus> => {
  const { data } = await api.post("/order-status", orderStatus);
  return data;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const { data } = await api.post("/product", product);
  return data;
};

export const updateCustomer = async (
  customerId: number,
  customer: Customer
): Promise<Customer> => {
  const { data } = await api.put(`/customer/${customerId}`, customer);
  return data;
};

export const updateOrderStatus = async (
  orderStatusId: number,
  orderStatus: OrderStatus
): Promise<OrderStatus> => {
  const { data } = await api.put(`/order-status/${orderStatusId}`, orderStatus);
  return data;
};

export const updateProduct = async (
  productId: number,
  product: Product
): Promise<Product> => {
  const { data } = await api.put(`/product/${productId}`, product);
  return data;
};

export const deleteCustomer = async (customerId: number): Promise<void> => {
  await api.delete(`/customer/${customerId}`);
};

export const deleteOrderStatus = async (
  orderStatusId: number
): Promise<void> => {
  await api.delete(`/order-status/${orderStatusId}`);
};

export const deleteProduct = async (productId: number): Promise<void> => {
  await api.delete(`/product/${productId}`);
};

export const getPayments = async (): Promise<Payment[]> => {
  const { data } = await api.get("/payments");
  return data;
};

export const createPayment = async (payment: Payment): Promise<Payment> => {
  const { data } = await api.post("/payments", payment);
  return data;
};

export const createSupplier = async (supplier: Supplier): Promise<Supplier> => {
  const { data } = await api.post("/suppliers", supplier);
  return data;
};

export const createSupplierProduct = async (
  supplierProduct: SupplierProduct
): Promise<SupplierProduct> => {
  const { data } = await api.post("/supplier-products", supplierProduct);
  return data;
};

export const getSuppliers = async (): Promise<Supplier[]> => {
  const { data } = await api.get("/suppliers");
  return data;
};

export const getSupplierProducts = async (): Promise<SupplierProduct[]> => {
  const { data } = await api.get("/supplier-products");
  return data;
};

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get("/categories");
  return data;
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const { data } = await api.get(`/categories/${id}`);
  return data;
};

export const createCategory = async (
  category: Omit<Category, "CategoryID">
): Promise<Category> => {
  const { data } = await api.post("/categories", category);
  return data;
};

export const updateCategory = async (
  id: number,
  category: Partial<Category>
): Promise<Category> => {
  const { data } = await api.patch(`/categories/${id}`, category);
  return data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/categories/${id}`);
};

export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const { data } = await api.get("/payment-methods");
  return data;
};

export const getPaymentMethodById = async (
  id: number
): Promise<PaymentMethod> => {
  const { data } = await api.get(`/payment-methods/${id}`);
  return data;
};

export const createPaymentMethod = async (
  paymentMethod: Omit<PaymentMethod, "PaymentMethodID">
): Promise<PaymentMethod> => {
  const { data } = await api.post("/payment-methods", paymentMethod);
  return data;
};

export const updatePaymentMethod = async (
  id: number,
  paymentMethod: Partial<PaymentMethod>
): Promise<PaymentMethod> => {
  const { data } = await api.patch(`/payment-methods/${id}`, paymentMethod);
  return data;
};

export const deletePaymentMethod = async (id: number): Promise<void> => {
  await api.delete(`/payment-methods/${id}`);
};

export const getPurchaseInvoices = async (): Promise<PurchaseInvoice[]> => {
  const { data } = await api.get("/purchase-invoices");
  return data;
};

export const getPurchaseInvoiceById = async (
  id: number
): Promise<PurchaseInvoice> => {
  const { data } = await api.get(`/purchase-invoices/${id}`);
  return data;
};

export const createPurchaseInvoice = async (
  invoice: Omit<PurchaseInvoice, "PurchaseInvoiceID">
): Promise<PurchaseInvoice> => {
  const { data } = await api.post("/purchase-invoices", invoice);
  return data;
};

export const updatePayment = async (
  id: number,
  payment: Partial<Payment>
): Promise<Payment> => {
  const { data } = await axios.patch(`/payments/${id}`, payment);
  return data;
};

export const deletePayment = async (id: number): Promise<void> => {
  await axios.delete(`/payments/${id}`);
};

export const updatePurchaseInvoice = async (
  id: number,
  invoice: Partial<PurchaseInvoice>
): Promise<PurchaseInvoice> => {
  const { data } = await api.patch(`/purchase-invoices/${id}`, invoice);
  return data;
};

export const deletePurchaseInvoice = async (id: number): Promise<void> => {
  await api.delete(`/purchase-invoices/${id}`);
};

export const getPurchaseInvoiceDetails = async (): Promise<
  PurchaseInvoiceDetail[]
> => {
  const { data } = await api.get("/purchase-invoice-details");
  return data;
};

export const getPurchaseInvoiceDetailById = async (
  id: number
): Promise<PurchaseInvoiceDetail> => {
  const { data } = await api.get(`/purchase-invoice-details/${id}`);
  return data;
};

export const createPurchaseInvoiceDetail = async (
  detail: Omit<PurchaseInvoiceDetail, "PurchaseInvoiceDetailID">
): Promise<PurchaseInvoiceDetail> => {
  const { data } = await api.post("/purchase-invoice-details", detail);
  return data;
};

export const updatePurchaseInvoiceDetail = async (
  id: number,
  detail: Partial<PurchaseInvoiceDetail>
): Promise<PurchaseInvoiceDetail> => {
  const { data } = await api.patch(`/purchase-invoice-details/${id}`, detail);
  return data;
};

export const deletePurchaseInvoiceDetail = async (
  id: number
): Promise<void> => {
  await api.delete(`/purchase-invoice-details/${id}`);
};

export default api;
