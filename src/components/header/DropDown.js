import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, Menu } from "antd";
import {
  HomeOutlined,
  EditOutlined,
  FolderOpenOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const menu = (
  <Menu>
    <Menu.Item key="home" icon={<HomeOutlined />}>
      <Link to="/">主页</Link>
    </Menu.Item>
    <Menu.Item key="technology" icon={<EditOutlined />}>
      <Link to="/tags/技术">技术篇</Link>
    </Menu.Item>
    <Menu.Item key="life" icon={<FolderOpenOutlined />}>
      <Link to="/tags/生活">生活篇</Link>
    </Menu.Item>
    <Menu.Item key="author" icon={<UserOutlined />}>
      <Link to="/me">关于博主</Link>
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
        width="45%"
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
