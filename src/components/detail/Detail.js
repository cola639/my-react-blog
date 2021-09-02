import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Spin } from "antd";
import Header from "../header/Header";
import Interactive from "./Interactive";
import Content from "./Content";
import SiderBar from "../content/SiderBar";
import Navigation from "./Navigation";
import Footer from "../common/Footer";
import Title from "../common/Title";
import BackTop from "../common/BackTop";
import DetailContext from "../../context/DetailContext";
import { getArticle } from "../../services/articleService";

import "./detail.less";

function Detail(props) {
  const [article, setArticle] = useState([]);

  async function getArticleDetail() {
    try {
      const { data: result } = await getArticle(props.match.params.id);

      setArticle(result);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return props.history.replace("/not-found");
    }
  }

  useEffect(() => {
    getArticleDetail();
  }, []);

  return (
    <React.Fragment>
      <DetailContext.Provider value={{ article }}>
        <Title title={article.title} />
        <Header />

        <Row
          className="container--big block  main detail-container"
          justify="space-between"
        >
          <Interactive {...props} />
          <Col xs={24} sm={17} md={17} lg={17} xl={16}>
            {!article.content && (
              <Spin
                tip="加载中"
                size="large"
                style={{
                  position: "fixed",
                  top: "10rem",
                  left: "50%",
                  zIndex: "999",
                }}
              />
            )}
            {article.content && article.img && <Content {...props} />}
          </Col>
          <Col xs={0} sm={6} md={6} lg={6} xl={7} className="detail-siderbar">
            <SiderBar />
            <Navigation />
          </Col>
        </Row>

        <Footer />
        <BackTop />
      </DetailContext.Provider>
    </React.Fragment>
  );
}

export default withRouter(Detail);
