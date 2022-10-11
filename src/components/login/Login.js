import React, { useState } from "react";
import { Form, Input, Checkbox, Modal, Button, Divider } from "antd";
import SvgIcon from "../common/SvgIcon";
import auth from "../../services/authService";
import { oauth_url, client_id } from "../../services/config.json";

//从Header.js组件导入
function Login({ visible, onOk, onCancel }) {
  const [error, setError] = useState("");

  async function onFinish(values) {
    try {
      const previousPath = window.location.href;

      await auth.login(values.email, values.password);

      window.location = previousPath;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setError(ex.response.data);
      }
    }
  }

  function handleOAuth() {
    window.location.href = `${oauth_url}?client_id=${client_id}`;
  }

  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      destroyOnClose
      centered //居中
      width={600}
      footer={null} //取消底部多余显示
      title="登陆博客" //标题
      style={{ textAlign: "center" }}
    >
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFieldsChange={() => setError("")}
        onFinish={onFinish}
      >
        <Form.Item
          label="账号邮箱"
          name="email"
          rules={[
            {
              required: true,
              message: "请输入您的邮箱",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="用户密码"
          name="password"
          rules={[
            {
              required: true,
              message: "请输入您的密码",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>记住账号密码</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            登陆
          </Button>
        </Form.Item>
      </Form>
      <Divider>Github授权登陆</Divider>
      <button
        onClick={handleOAuth}
        style={{
          border: "none",
          cursor: "pointer",
          backgroundColor: "transparent",
        }}
      >
        <SvgIcon type="git" />
      </button>
      {error && <p>{error}</p>}
    </Modal>
  );
}

export default Login;
