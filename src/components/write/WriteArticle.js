import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Input, Button, Cascader, message } from "antd";
import UserContext from "../../context/UserContext";
import { saveArticle, getArticle } from "../../services/articleService";
import { postLikes } from "../../services/likesService";
import MarkdownData from "../../utils/markdown";
import "./writeArticle.less";

const { TextArea } = Input;

const options = [
  {
    value: "technology",
    label: "技术",
    children: [
      {
        value: "node",
        label: "node",
      },
      {
        value: "js",
        label: "js",
      },
      {
        value: "http",
        label: "http",
      },
      {
        value: "react",
        label: "react",
      },
    ],
  },
  {
    value: "life",
    label: "生活",
  },
];

function WriteArticle(props) {
  const userContext = useContext(UserContext);

  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [description, setDescription] = useState("");
  const [markdownContent, setMarkdownContent] = useState("预览内容");
  const [category, setCategory] = useState();

  useEffect(() => {
    populateArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.id]);

  async function populateArticle() {
    try {
      const articleId = props.match.params.id;
      if (articleId === "new") return handleGetDraft();

      const { data: article } = await getArticle(articleId);

      console.log(article.category, typeof article.category);
      setArticleTitle(article.title);
      setArticleContent(article.content);
      setDescription(article.description);
      setCategory(article.category);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        props.history.replace("/not-found");
    }
  }

  async function handleSubmit() {
    const newArticle = {
      author: userContext.user._id,
      title: articleTitle,
      description: description,
      content: articleContent,
      category,
    };

    try {
      const { data: result } = await saveArticle(newArticle);

      await postLikes(result._id);

      setArticleTitle("");
      setArticleContent("");
      setDescription("");
      setMarkdownContent("");
      message.success("发布成功");
    } catch (error) {
      message.warn(error.response.data);
    }
  }

  function handleGetDraft() {
    if (userContext.user._id === localStorage.getItem("author")) {
      setArticleTitle(localStorage.getItem("title"));
      setArticleContent(localStorage.getItem("content"));
      setDescription(localStorage.getItem("description"));
      setCategory(localStorage.getItem("category"));
    }
  }

  function handleChangeContent(e) {
    setArticleContent(e.target.value);
    let html = MarkdownData(e.target.value);
    setMarkdownContent(html);
  }

  function handleDraft() {
    localStorage.setItem("author", userContext.user._id);
    localStorage.setItem("title", articleTitle);
    localStorage.setItem("description", description);
    localStorage.setItem("content", articleContent);
    localStorage.setItem("category", category);
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                placeholder="文章标题"
                size="large"
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.currentTarget.value)}
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Cascader
                style={{ maxWidth: "10rem", color: "#000" }}
                placeholder="文章分类"
                defaultValue={category}
                value={category}
                options={options}
                onChange={(type) => setCategory(type)}
              />
            </Col>
          </Row>

          <Row gutter={0} className="write-description">
            <Col span={20}>
              <TextArea
                rows={4}
                placeholder="文章简介"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button
                type="primary"
                size="middle"
                className="draft_button"
                onClick={handleDraft}
              >
                保存草稿
              </Button>
              <Button type="primary" size="middle" onClick={handleSubmit}>
                发布文章
              </Button>
            </Col>
          </Row>
        </Col>

        <Col span={24} className="markdown-container">
          <Row gutter={20}>
            <Col span={12}>
              <TextArea
                value={articleContent}
                className="markdown-content"
                rows={35}
                onChange={handleChangeContent}
                placeholder="文章内容"
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default WriteArticle;
