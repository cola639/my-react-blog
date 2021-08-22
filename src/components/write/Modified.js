import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Button, Form, Input } from "antd";
import BraftEditor from "braft-editor";
import UserContex from "../../context/UserContext";
import { getArticle, saveArticle } from "../../services/articleService";
import getMarkdownData from "../../utils/markdown";

function Modified(props) {
  const userContext = useContext(UserContex);

  const [oldArticle, setOldArticle] = useState([]);
  const [form] = Form.useForm(); //创建控制实例

  async function getOriginalArticle() {
    const { data: oldArticleResult } = await getArticle(props.match.params.id);
    oldArticleResult.content = getMarkdownData(oldArticleResult.content);
    setOldArticle(oldArticleResult);
  }

  //populate编辑框内容
  function populateArticle() {
    form.setFieldsValue({
      title: oldArticle.title,
      description: oldArticle.description,
      img: oldArticle.img,
      content: BraftEditor.createEditorState(oldArticle.content),
    });
  }

  useEffect(() => {
    getOriginalArticle();
    populateArticle();
  }, [oldArticle._id]);

  //对应Form.Item获取对应数据分别为title,description,img,content
  async function handleFinsh(values) {
    //设置上传数据
    const newArticle = {
      _id: oldArticle._id,
      title: values.title,
      description: values.description,
      img: values.img,
      author: userContext.user._id,
      content: values.content.toHTML(), // or values.content.toRaw() 通过Form.item内"name"获得富文本内容
    };

    await saveArticle(newArticle);
    props.history.push("/");
  }

  return (
    <Row>
      <Col span={15} className="addArt-div">
        <h4>添加新文章</h4>
        <Form onFinish={handleFinsh} form={form}>
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: "请输入您的标题！",
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
                message: "请输入您的简介！",
              },
            ]}
          >
            <Input placeholder="请输入您的简介" />
          </Form.Item>
          <Form.Item
            name="img"
            label="封面图片"
            rules={[
              {
                required: true,
                message: "请输入图片地址，仅支持超链接形式",
              },
            ]}
          >
            <Input name="图片" />
          </Form.Item>
          <Form.Item
            name="content"
            label="正文"
            style={{
              border: "1px solid #d1d1d1",
              borderRadius: "10px",
              marginBottom: "25px",
            }}
            rules={[
              {
                required: true,
                message: "内容不能为空",
              },
              //添加自己设置的验证标准
              {
                validator(_, value) {
                  if (!value.isEmpty()) {
                    return Promise.resolve();
                  }
                },
              },
            ]}
          >
            <BraftEditor placeholder="请输入正文内容" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              发布文章
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Modified;
