import React, { useContext } from "react";
import MarkNav from "markdown-navbar";
import DetailContext from "../../context/DetailContext";
import "markdown-navbar/dist/navbar.css";

function Navigation(props) {
  const { article } = useContext(DetailContext);

  return (
    <div className="nav-container">
      <MarkNav source={article.content} />
    </div>
  );
}

export default Navigation;
