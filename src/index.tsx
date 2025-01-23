import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ConfigProvider } from "antd";

ReactDOM.render(
  <React.StrictMode>
      <ConfigProvider>
          <App />
      </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
