import React, { useEffect, useState } from "react";
import { getOrderReport } from "../api/apiClient";
import { Report } from "../types/apiTypes";

const OrderReportDetails: React.FC = () => {
  const [reportDetails, setReportDetails] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReport = async () => {
      const data = await getOrderReport();
      setReportDetails(data);
    };
    fetchReport();
  }, []);

  return (
    <div>
      <h2>Order Report Details</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Order Status</th>
            <th>Total Orders</th>
            <th>Total Quantity</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {reportDetails.map((item, index) => (
            <tr key={index}>
              <td>{item.CustomerName}</td>
              <td>{item.OrderStatus}</td>
              <td>{item.TotalOrders}</td>
              <td>{item.TotalQuantity}</td>
              <td>${item.TotalSales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderReportDetails;
