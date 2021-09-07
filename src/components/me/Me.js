import React from "react";
import { Divider, Rate } from "antd";
import SvgIcon from "../common/SvgIcon";
import logo from "../../assets/logo.png";
import "./me.less";

function Me(props) {
  return (
    <div className="card block blcok--white me">
      <h2>
        <img src={logo} alt="author wechat" className="icon" />
        <span>业精于勤,荒于嬉</span>
      </h2>
      <Divider>博客简述</Divider>
      <article className="me-description">
        <p>本博客使用的技术为 React+ Hooks + Antd + Express + MongoDB</p>
        <p>源码地址为 Github，仅供参考，不做商业用途！</p>
      </article>
      <Divider>关于我</Divider>
      <ul>
        <li>姓名：xihe Guan</li>
        <li>学历专业： 本科 广东金融学院 计算机与科学技术系</li>
        <li>联系方式：337507950@qq.com</li>
        <li>坐标：广州市</li>
        <li>
          Github地址:
          <a target="_blank" href="https://github.com/cola639" rel="noreferrer">
            <SvgIcon className="icon--middle" type="git" />
            我的Github
          </a>
        </li>
        <li>
          技能
          <ul className="me-skill">
            <li>
              熟悉HTML5+CSS3基础,熟悉Flex布局,Grid布局,盒模型和移动端适配.
              <Rate allowHalf defaultValue={4} className="me-skill_rate" />
            </li>
            <li>
              具备扎实的 Javascript 基础,熟练使用 ES6+ 语法.
              <Rate allowHalf defaultValue={4} className="me-skill_rate" />
            </li>

            <li>
              熟悉React并了解其原理,熟练运React + react-router-dom +
              create-react-app + axios + hooks + redux.
              <Rate allowHalf defaultValue={4} className="me-skill_rate" />
            </li>
            <li>
              掌握Express+MongoDB能设计简单的中间件+数据库,进行数据交互.
              <Rate allowHalf defaultValue={3.5} className="me-skill_rate" />
            </li>
            <li>
              掌握使用 Webpack 打包工具,熟悉常用工程化和模块化方案.
              <Rate allowHalf defaultValue={3} className="me-skill_rate" />
            </li>

            <li>
              熟悉 HTTP 协议，缓存、性能优化、安全等,了解浏览器原理.
              <Rate allowHalf defaultValue={3} className="me-skill_rate" />
            </li>
            <li>
              了解常用的算法与数据结构
              <Rate allowHalf defaultValue={2.5} className="me-skill_rate" />
            </li>
          </ul>
        </li>
        <li>
          其他
          <ul className="me-skill">
            <li>
              常用开发工具: Vscode、 Git 、Postman 、React Developer
              Tools、Chorm Developer Tools
            </li>
            <li>熟悉的 UI 框架： Antd、BootStrap</li>
            <li>具备良好的编码风格和习惯、团队规范意识、乐于分享</li>
            <li>
              每天保持两小时+自学时间, 爱逛Github、 Stack overflow、 CSDN和思否
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Me;
