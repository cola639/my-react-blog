import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Checkbox, Button, Divider } from "antd";
import SvgIcon from "../common/SvgIcon";
import { register } from "../../services/userService";
import auth from "../../services/authService";
import "./register.less";

function Register(props) {
  const [error, setError] = useState();

  useEffect(() => {
    document.getElementsByTagName("body")[0].className = "body_back";
    return () => {
      document.body.removeAttribute("class", "body_back");
    };
  }, []);

  async function onFinish(values) {
    try {
      const response = await register(values);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      //conditional render
      if (ex.response && ex.response.status === 400) {
        setError(ex.response.data);
      }
    }
  }

  return (
    <React.Fragment>
      <h2>注册新用户</h2>
      <div className="register__card">
        <Form
          name="basic"
          onFinish={onFinish}
          onFieldsChange={() => setError("")}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入您的名字",
              },
            ]}
          >
            <Input size="large" placeholder="输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入您的密码",
              },
            ]}
          >
            <Input type="password" size="large" placeholder="输入用户密码" />
          </Form.Item>
          <Form.Item
            name="confirm"
            rules={[
              {
                required: true,
                message: "确认您的密码",
              },
            ]}
          >
            <Input type="password" size="large" placeholder="确认您的密码" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "请输入邮箱",
              },
            ]}
          >
            <Input size="large" placeholder="输入邮箱地址" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                borderRadius: "25px",
                width: "60%",
                height: "60%",
                padding: "2rem 3rem",
                marginTop: "10px",
              }}
            >
              注册
            </Button>
          </Form.Item>
          <Form.Item
            name="agreement"
            //删掉valuePropName会Warning: [antd: Checkbox] `value` is not a valid prop, do you mean `checked`?
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("若要注册，请同意用户协议"),
              },
            ]}
          >
            <Checkbox>
              同意<Link to="/sign_up">用户协议 </Link>
            </Checkbox>
          </Form.Item>
        </Form>
        {error && <span style={{ color: "red" }}>{error}</span>}
        <Divider>Github授权登陆</Divider>
        <a href="/">
          <SvgIcon type="git" />
        </a>
      </div>
    </React.Fragment>
  );
}

export default Register;
