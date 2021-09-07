import React, { useState } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { Layout, Menu } from "antd";
import WriteArticle from "./WriteArticle";
import Management from "./Management";
import UserManagement from "./UserManagement";
import ImgManagement from "./ImgManagement";
import Title from "../common/Title";
import SvgIcon from "../common/SvgIcon";
import "braft-editor/dist/index.css";
import "./write.less";

const { Content, Sider } = Layout;

function Write(props) {
  const [collapsed, setcollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Title title="文章后台" />
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => {
          setcollapsed(collapsed);
        }}
      >
        <a href="/" className="write-back">
          首页
        </a>

        <Menu theme="dark" mode="inline">
          <Menu.Item
            key="write"
            icon={<SvgIcon type="fabiao1" className="icon--small" />}
          >
            <Link to="/write/add/new">创作文章</Link>
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
            <Link to="/write/manage-img">封面选择</Link>
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
              <Route path="/write/add/:id" component={WriteArticle} />
              <Route path="/write/manage-img" component={ImgManagement} />
              <Route path="/write/manage-articles" component={Management} />
              <Route path="/write/manage-users" component={UserManagement} />
              <Redirect from="/write" to="/write/add/new" />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Write;
