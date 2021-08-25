import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Menu, Input, Button, Avatar, Dropdown } from "antd";
import {
  HomeOutlined,
  EditOutlined,
  FolderOpenOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import DropDown from "./DropDown";
import SvgIcon from "../common/SvgIcon";
import MobileSearch from "./MobileSearch";
import Login from "../login/Login";
import UserContext from "../../context/UserContext";
import logo from "../../assets/logo.png";
import "./header.less";

function Header(props) {
  const userContext = useContext(UserContext);

  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleSearch(e) {
    if (!e.currentTarget.value.trim()) return;
    props.history.push(`/search?name=${e.currentTarget.value}`);
  }

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
          onPressEnter={handleSearch}
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
      {!userContext.user && (
        <Col xs={0} sm={0} md={5} lg={4} xl={6} className="header__user">
          <Button
            type="primary"
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            登陆
          </Button>
          <Link to="/sign-up" className="header__user__link">
            注册
          </Link>
        </Col>
      )}
      {userContext.user && (
        <Col xs={0} sm={0} md={5} lg={4} xl={6} className="header__user">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="logout">
                  <Link to="/logout">退出账户</Link>
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Avatar size={32} style={{ cursor: "pointer" }}>
              {userContext.user.name}
            </Avatar>
          </Dropdown>

          {(userContext.user.isAdmin || userContext.user.isAuthor) && (
            <Link to="/write" className="header__user__write">
              <SvgIcon type="fabiao1" /> 写文章
            </Link>
          )}
        </Col>
      )}
      <Col
        xs={2}
        sm={0}
        className="header__mobile__search"
        id="dropdown-header"
      >
        <MobileSearch />
      </Col>

      <Login
        visible={isModalVisible}
        onOk={() => {
          setIsModalVisible(false);
        }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      />
    </Row>
  );
}

export default Header;
