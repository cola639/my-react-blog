import React, { useContext, useState } from "react";
import BraftEditor from "braft-editor";
import { Row, Col, Button, Input, Form, Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UserContext from "../../context/UserContext";
import { saveArticle } from "../../services/articleService";
import { postLikes } from "../../services/likesService";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

function AddArticle(props) {
  const userContext = useContext(UserContext);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [imgList, setImgList] = useState([]);

  async function onFinish(values) {
    const newArticle = {
      author: userContext.user._id,
      title: values.title,
      description: values.description,
      img: values.img,
      content: values.content.toHTML(), // or values.content.Raw() 通过<Form.item>内"name"获得富文本内容
    };
    console.log(newArticle);
    const { data: result } = await saveArticle(newArticle);

    await postLikes(result._id);
    setTimeout(() => {
      props.history.push("/");
    }, 500);
  }

  async function handlePreview(file) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  }

  function handleCancel() {
    setPreviewVisible(false);
  }

  function handleChange(info) {
    setImgList(info.fileList);
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
            <>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={imgList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {imgList.length >= 2 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </>
          </Form.Item>

          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: "内容不能为空",
              },
              //添加实时验证标准
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
