import React from "react";
import { Dropdown, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import {
  EditOutlined,
  FolderOpenOutlined,
  UserOutlined,
} from "@ant-design/icons";

const menu = (
  <Menu>
    <Menu.Item key="video" icon={<EditOutlined />}>
      <a href="/">技术篇</a>
    </Menu.Item>
    <Menu.Item key="article" icon={<FolderOpenOutlined />}>
      <a href="/">生活篇</a>
    </Menu.Item>
    <Menu.Item key="author" icon={<UserOutlined />}>
      <a href="/">关于作者</a>
    </Menu.Item>
  </Menu>
);

function DropDown(props) {
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()} href="/">
        <MenuOutlined className="nav__toggler" />
      </a>
    </Dropdown>
  );
}

export default DropDown;
