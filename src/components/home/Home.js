import React, { useEffect } from "react";
import queryString from "query-string";
import { message, Spin } from "antd";
import Header from "../header/Header";
import Center from "./Center";
import Footer from "../common/Footer";
import BackTop from "../common/BackTop";
import Title from "../common/Title";
import auth from "../../services/authService";
import { github } from "../../services/userService";
import "./home.less";

function Home(props) {
  const query = queryString.parse(props.location.search);

  async function githubLgoin() {
    if (query.code) {
      try {
        const result = await github(query);

        auth.loginWithJwt(result.headers["x-auth-token"]);
      } catch (error) {
        message.error("登陆出错,请重试");
      }
      setTimeout(() => {
        window.location = "/";
      }, 500);
    }
  }

  useEffect(() => {
    githubLgoin(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Title title="博客主页" />
      <Header {...props} />

      {query.code && (
        <div className="main">
          <Spin
            tip="拼命登陆ing"
            size="large"
            style={{
              position: "fixed",
              top: "10rem",
              left: "50%",
              zIndex: "999",
            }}
          />
        </div>
      )}

      {!query.code && <Center />}

      <Footer />
      <BackTop />
    </>
  );
}

export default Home;
