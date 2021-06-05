import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import App from "./App";
import 'antd/dist/antd.css';
//ant全局化配置
import { ConfigProvider } from 'antd';
import zhCN from "antd/lib/locale/zh_CN";

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
    <Router>
        <App></App>
    </Router>
    </ConfigProvider>,
    document.getElementById("root")
);
