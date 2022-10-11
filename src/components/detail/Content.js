import React, { useContext } from "react";
import moment from "moment";
import { Breadcrumb, Skeleton } from "antd";
import ArticleComment from "../comment/ArticleComment";
import DetailContext from "../../context/DetailContext";
import MarkdownData from "../../utils/markdown";
import { imgUrl } from "../../services/config.json";

function Content(props) {
  const { article } = useContext(DetailContext);

  return (
    <section className="article-container">
      <nav>
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <span> 首页</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>{article.title}</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </nav>
      {article.content ? (
        <div className=" card blcok--white article">
          <div className="article__img">
            {article.img ? (
              <img alt="header img" src={`${imgUrl}${article.img}`} />
            ) : null}
          </div>
          <div>
            <h2 className="article__title">{article.title}</h2>
            <div className="article__list">
              <time
                dateTime={moment(article.time).format("YYYY-MM-DD HH:mm")}
                style={{ marginLeft: "12px" }}
              >
                <span>发布时间 </span>
                {moment(article.time).format("YYYY-MM-DD HH:mm")}
              </time>
              <span className="article__author">
                作者:{article.author ? article.author.name : ""}{" "}
              </span>
            </div>
            <article
              className="article__content"
              dangerouslySetInnerHTML={{
                __html: MarkdownData(article.content ? article.content : ""),
              }}
            />
            <ArticleComment {...props} />
          </div>
        </div>
      ) : (
        <div>
          <Skeleton />
        </div>
      )}
    </section>
  );
}

export default Content;
