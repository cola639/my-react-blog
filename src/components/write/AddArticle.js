import React, { useContext } from "react";
import BraftEditor from "braft-editor";
import { Row, Col, Button, Input, Form } from "antd";
import UserContext from "../../context/UserContext";
import { saveArticle } from "../../services/articleService";
import { postLikes } from "../../services/likesService";

function AddArticle(props) {
  const userContext = useContext(UserContext);

  async function onFinish(values) {
    const newArticle = {
      author: userContext.user._id,
      title: values.title,
      description: values.description,
      img: values.img,
      content: values.content.toHTML(), //values.content.toRaw()  or values.content.toHTML() 通过<Form.item>内"name"获得富文本内容
    };

    console.log(values.content.toHTML());
    // const { data: result } = await saveArticle(newArticle);
    // await postLikes(result._id);

    // setTimeout(() => {
    //   props.history.push("/");
    // }, 500);
  }

  return (
    <Row>
      <Col span={15} className="write-add">
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
          <Form.Item name="img" label="封面图片">
            <Input placeholder="封面图片，仅支持超链接形式" />
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
    </Row>
  );
}

export default AddArticle;
