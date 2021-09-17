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
import SearchInput from "./SearchInput";
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
        <h1>
          <a href="/">
            <img src={logo} alt="Logo" height="100%" /> Cola
          </a>
        </h1>
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
          <div>
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
              <span className="author-avatar">
                {userContext.user.avatar && (
                  <Avatar
                    size={32}
                    style={{ cursor: "pointer" }}
                    src={userContext.user.avatar}
                  />
                )}
                {!userContext.user.avatar && (
                  <Avatar
                    size={32}
                    style={{ cursor: "pointer", backgroundColor: "#87d068" }}
                    icon={<SvgIcon type="monkey" />}
                  />
                )}
              </span>
            </Dropdown>

            <span className="author-name"> {userContext.user.name}</span>
          </div>
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
        <SearchInput {...props} />
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
