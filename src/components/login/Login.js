import React, { useState, useContext } from "react";
import { Form, Input, Checkbox, Modal, Button } from "antd";
import DetailContext from "../../context/DetailContext";
import auth from "../../services/authService";

//从Header.js组件导入
function Login({ visible, onOk, onCancel }) {
  const detailContext = useContext(DetailContext);

  const [error, setError] = useState("");

  async function onFinish(values) {
    try {
      await auth.login(values.email, values.password);

      window.location = detailContext ? detailContext.location.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setError(ex.response.data);
      }
    }
  }

  function handleChange() {
    setError("");
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
        onFieldsChange={handleChange}
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
      {error && <p>{error}</p>}
    </Modal>
  );
}

export default Login;
