import React, { useContext } from "react";
import moment from "moment";
import { Breadcrumb } from "antd";
import SvgIcon from "../common/SvgIcon";
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

      <div className="card blcok--white article">
        <img
          className="article__img"
          src={`${imgUrl}${article.img}`}
          alt="header img"
        />
        <div>
          <h2 className="article__title">{article.title}</h2>
          <div className="article__list">
            <SvgIcon className="icon article__list__item" type="astronaut" />
            {article.author ? article.author.name : ""}
            <time
              dateTime={moment(article.time).format("YYYY-MM-DD HH:mm")}
              style={{ marginLeft: "12px" }}
            >
              <span>Time: </span>
              {moment(article.time).format("YYYY-MM-DD HH:mm")}
            </time>
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
    </section>
  );
}

export default Content;
