import React, { useState, useContext } from "react";
import BraftEditor from "braft-editor";
import { Row, Col, Button, Input, Form } from "antd";
import UploadImg from "./UploadImg";
import UserContext from "../../context/UserContext";
import { saveArticle } from "../../services/articleService";
import { postLikes } from "../../services/likesService";
import getMarkdownData from "../../utils/markdown";

function AddArticle(props) {
  const userContext = useContext(UserContext);

  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState()
  );

  async function onFinish(values) {
    const newArticle = {
      author: userContext.user._id,
      title: values.title,
      description: values.description,
      img: values.img,
      content: values.content.toHTML(), //values.content.toRaw()  or values.content.toHTML() 通过<Form.item>内"name"获得富文本内容
    };

    const { data: result } = await saveArticle(newArticle);
    await postLikes(result._id);
    console.log(result);
  }

  function handleChange(editorState) {
    setEditorState(editorState);
  }

  return (
    <Row>
      <Col span={12} className="write-add">
        <h2>添加新文章</h2>
        <Form onFinish={onFinish}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              发布文章
            </Button>
          </Form.Item>
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: "标题长度不能少于4个字符或大于25个字符",
                min: 4,
                max: 25,
              },
            ]}
          >
            <Input placeholder="请输入您的标题" />
          </Form.Item>
          <Form.Item
            label="文章简介"
            name="description"
            rules={[
              {
                required: true,
                message: "标题长度不能少于10或大于60个字符",
                min: 10,
                max: 60,
              },
            ]}
          >
            <Input placeholder="请输入您的简介" />
          </Form.Item>
          <Form.Item name="img">
            <UploadImg />
          </Form.Item>

          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: "内容不能为空",
              },
              //实时验证
              {
                validator(_, value) {
                  if (!value.isEmpty()) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error("发布内容不能为空"));
                },
              },
            ]}
          >
            <BraftEditor placeholder="请输入正文内容" />
          </Form.Item>
        </Form>
      </Col>
      <Col
        span={11}
        style={{
          backgroundColor: "#fff",
          textAlign: "center",
          margin: "10px 10px ",
        }}
      >
        <article
          className="preview-content"
          dangerouslySetInnerHTML={{
            __html: getMarkdownData("预览区"),
          }}
        />
      </Col>
    </Row>
  );
}

export default AddArticle;
