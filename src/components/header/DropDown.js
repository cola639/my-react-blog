import React, { useState } from "react";
import { Drawer, Menu } from "antd";
import {
  EditOutlined,
  FolderOpenOutlined,
  UserOutlined,
  MenuOutlined,
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
  const [visible, setVisible] = useState(false);
  return (
    <React.Fragment>
      <button
        onClick={() => setVisible(true)}
        style={{ border: 0, backgroundColor: "transparent", cursor: "pointer" }}
      >
        <MenuOutlined className="nav__toggler" />
      </button>
      <Drawer
        width="35%"
        placement="left"
        closable={false}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
        key="left"
      >
        {menu}
      </Drawer>
    </React.Fragment>
  );
}

export default DropDown;
