import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import Content from "./Content";
import Interactive from "./Interactive";
import Navigation from "./Navigation";
import ArticleContext from "../../context/ArticleContext";
import { getArticle } from "../../services/articleService";

function DetailCenter(props) {
  const [article, setArticle] = useState([]);

  async function getArticleDetail() {
    try {
      const { data: article } = await getArticle(props.match.params.id);

      setArticle(article);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return props.history.push("/not-found");
    }
  }

  useEffect(() => {
    getArticleDetail();
  }, []);
  return (
    <ArticleContext.Provider value={{ article }}>
      <Row className="container block detail-container">
        <Col xs={24} xl={17}>
          <Content {...props} />
        </Col>
        <Col xs={0} xl={5} push={2}>
          <Navigation />
        </Col>
        <Interactive {...props} />
      </Row>
    </ArticleContext.Provider>
  );
}

export default DetailCenter;
