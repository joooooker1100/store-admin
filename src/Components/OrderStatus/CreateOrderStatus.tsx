import React, { useState } from "react";
import { createOrderStatus } from "../api/apiClient";
import { OrderStatus } from "../types/apiTypes";

const CreateOrderStatus: React.FC = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newStatus: OrderStatus = {
      OrderStatusID: 0, // will be auto-generated
      Name: name,
    };

    await createOrderStatus(newStatus);
    alert("Order Status added successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Order Status</h2>
      <input
        type="text"
        placeholder="Status Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Create Order Status</button>
    </form>
  );
};

export default CreateOrderStatus;
