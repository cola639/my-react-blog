import React from "react";
import { Row, Col, Menu, Input, Button } from "antd";
import {
  HomeOutlined,
  EditOutlined,
  FolderOpenOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import DropDown from "./DropDown";
import MobileSearch from "./MobileSearch";
import "./header.less";
import logo from "../../assets/logo.png";

function Header(props) {
  return (
    <Row className="header" wrap={false}>
      <Col xs={2} sm={0} md={0} lg={0} xl={0} className="header__toggler">
        <DropDown />
      </Col>
      <Col xs={19} sm={3} md={3} lg={3} xl={3} className="header__brand">
        <a href="/">
          <img src={logo} alt="Logo" height="100%" />
        </a>
        <h1>Cola</h1>
      </Col>
      <Col xs={0} sm={5} md={5} lg={5} xl={4} className="header__search ">
        <Input
          placeholder="Enter your search"
          prefix={<SearchOutlined />}
          bordered={false}
        />
      </Col>
      <Col xs={0} sm={16} md={15} lg={12} xl={10} className="header__menu">
        <Menu mode="horizontal">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <a href="/">主页</a>
          </Menu.Item>
          <Menu.Item key="technology" icon={<EditOutlined />}>
            <a href="/">技术篇</a>
          </Menu.Item>
          <Menu.Item key="life" icon={<FolderOpenOutlined />}>
            <a href="/">生活篇</a>
          </Menu.Item>
          <Menu.Item key="author" icon={<UserOutlined />}>
            <a href="/">关于博主</a>
          </Menu.Item>
        </Menu>
      </Col>
      <Col xs={0} sm={0} md={5} lg={4} xl={6} className="header__user">
        <Button type="primary">登陆</Button>
        <a href="/" className="header__user__link">
          注册
        </a>
      </Col>
      <Col xs={2} sm={0} className="header__mobile__search">
        <MobileSearch />
      </Col>
    </Row>
  );
}

export default Header;
