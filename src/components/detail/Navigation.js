import React, { useContext } from "react";
import MarkdownNavbar from "markdown-navbar";
import { Affix } from "antd";
import ArticleContext from "../../context/ArticleContext";
import "markdown-navbar/dist/navbar.css";

function Navigation(props) {
  const { article } = useContext(ArticleContext);

  return (
    <Affix offsetTop={100} style={{ position: "fixed" }}>
      <div>
        <MarkdownNavbar source={article.content} />
      </div>
    </Affix>
  );
}

export default Navigation;
