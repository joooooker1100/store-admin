import React, { useState } from "react";
import { createCustomer } from "../api/apiClient";
import { Customer } from "../types/apiTypes";

const CreateCustomer: React.FC = () => {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCustomer: Customer = {
      CustomerID: 0,
      CustomerName: customerName,
      Email: email,
      Phone: phone,
      Address: address,
    };

    await createCustomer(newCustomer);
    alert("Customer added successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Customer</h2>
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <button type="submit">Create Customer</button>
    </form>
  );
};

export default CreateCustomer;
