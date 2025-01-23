import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space } from "antd";
import { Product } from "../types/apiTypes";
import { getProducts } from "../api/apiClient";

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const columns = [
    { title: "Product Name", dataIndex: "ProductName", key: "ProductName" },
    { title: "Price", dataIndex: "Price", key: "Price" },
    { title: "Stock", dataIndex: "Stock", key: "Stock" },
    { title: "Description", dataIndex: "Description", key: "Description" },
  ];

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input.Search
          placeholder="Search by product name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={(value) => setSearchQuery(value)}
          style={{ marginBottom: 20 }}
        />
        <Button type="primary" style={{ marginBottom: 20 }}>
          New Product
        </Button>
        <Table
          columns={columns}
          dataSource={products.filter((product) =>
            product.ProductName.includes(searchQuery)
          )}
          loading={loading}
          rowKey="ProductID"
        />
      </Space>
    </div>
  );
};

export default ProductListPage;
