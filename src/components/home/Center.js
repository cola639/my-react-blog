import React from "react";
import { Route, Switch } from "react-router-dom";
import { Row, Col } from "antd";
import Article from "../content/Article";
import Tag from "../common/Tag";
import Search from "../search/Search";
import Me from "../me/Me";
import SiderBar from "../content/SiderBar";
import "./center.less";

function Center(props) {
  return (
    <Row className="container main center" justify="space-between">
      <Col xs={24} sm={18} md={18} lg={18} xl={16}>
        <Switch>
          <Route path="/search" component={Search} />
          <Route path="/me" component={Me} />
          <Route path="/tags/:id" component={Tag} />
          <Route path="/" exact component={Article} />
        </Switch>
      </Col>
      <Col xs={0} sm={6} md={6} lg={6} xl={7}>
        <SiderBar />
      </Col>
    </Row>
  );
}

export default Center;
