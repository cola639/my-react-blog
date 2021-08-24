import React, { useState } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { Layout, Menu } from "antd";
import AddArticle from "./AddArticle";
import Pubilshed from "./Pubilshed";
import Modified from "./Modified";
import SvgIcon from "../common/SvgIcon";
import "braft-editor/dist/index.css";
import "./write.less";

const { Content, Sider } = Layout;

function Write(props) {
  const [collapsed, setcollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setcollapsed(collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Link to="/" className="write-back">
          回到首页
        </Link>

        <Menu theme="dark" defaultSelectedKeys={["write"]} mode="inline">
          <Menu.Item
            key="write"
            icon={<SvgIcon type="fabiao1" className="icon--small" />}
          >
            <Link to="/write/add-article">创作文章</Link>
          </Menu.Item>
          <Menu.Item
            key="articles"
            icon={<SvgIcon type="manager" className="icon--small" />}
          >
            <Link to="/write/manage-articles">管理文章</Link>
          </Menu.Item>
          <Menu.Item
            key="manager"
            icon={<SvgIcon type="yonghu" className="icon--small" />}
          >
            <Link to="/write/manage-users">管理用户</Link>
          </Menu.Item>
          <Menu.Item
            key="tag"
            icon={<SvgIcon type="zhuce" className="icon--small" />}
          >
            <Link to="/write/manage-users">标签管理</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Switch>
              <Route path="/write/changeArticle/:id" component={Modified} />
              <Route path="/write/add-article" component={AddArticle} />
              <Route path="/write/manage-articles" component={Pubilshed} />
              <Redirect from="/write" to="/write/add-article" />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Write;
