import React, { useState } from "react";
import { createProduct } from "../api/apiClient";
import { Product } from "../types/apiTypes";

const CreateProduct: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryID, setCategoryID] = useState(0);
  const [employeeID, setEmployeeID] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      ProductID: 0,
      ProductName: productName,
      Price: price,
      Stock: stock,
      Description: description,
      CategoryID: categoryID,
      EmployeeID: employeeID,
    };

    await createProduct(newProduct);
    alert("Product added successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        required
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Category ID"
        value={categoryID}
        onChange={(e) => setCategoryID(Number(e.target.value))}
        required
      />
      <input
        type="number"
        placeholder="Employee ID"
        value={employeeID}
        onChange={(e) => setEmployeeID(Number(e.target.value))}
        required
      />
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProduct;
