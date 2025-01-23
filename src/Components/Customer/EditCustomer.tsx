import React, { useState, useEffect } from "react";
import { Customer } from "../types/apiTypes";
import { getCustomers, updateCustomer } from "../api/apiClient";

const EditCustomer: React.FC<{ customerId: number }> = ({ customerId }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      const data = await getCustomers();
      const customer = data.find((c) => c.CustomerID === customerId);
      setCustomer(customer || null);
    };
    fetchCustomer();
  }, [customerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (customer) {
      await updateCustomer(customerId, customer);
      alert("Customer updated successfully");
    }
  };

  if (!customer) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Customer</h2>
      <input
        type="text"
        placeholder="Customer Name"
        value={customer.CustomerName}
        onChange={(e) =>
          setCustomer({ ...customer, CustomerName: e.target.value })
        }
      />
      <input
        type="email"
        placeholder="Email"
        value={customer.Email}
        onChange={(e) => setCustomer({ ...customer, Email: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Phone"
        value={customer.Phone}
        onChange={(e) => setCustomer({ ...customer, Phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        value={customer.Address}
        onChange={(e) => setCustomer({ ...customer, Address: e.target.value })}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditCustomer;
