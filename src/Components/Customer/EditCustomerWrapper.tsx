import React from "react";
import { useParams } from "react-router-dom";
import EditCustomer from "Components/Customer/EditCustomer";

const EditCustomerWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>Error: Customer ID is required</p>;
  }

  const customerId = parseInt(id, 10); 
  if (isNaN(customerId)) {
    return <p>Error: Invalid Customer ID</p>;
  }

  return <EditCustomer customerId={customerId} />;
};

export default EditCustomerWrapper;
