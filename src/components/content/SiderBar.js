import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Divider, Tag, Tooltip } from "antd";
import SvgIcon from "../common/SvgIcon";
import avatar from "../../assets/avatar.png";
import "./siderbar.less";

function SiderBar(props) {
  const data = ["node", "js", "http", "react", "mongoDB", "webpack"];

  return (
    <div className="card siderbar">
      <div>
        <Avatar src={avatar} size={100} />
        <p>Cola639</p>
      </div>
      <div>
        <p>本网站由react+hooks+antd node+monogodb搭建</p>
        <Divider plain>文章标签</Divider>
        <div>
          {data.map((item) => (
            <Tag
              key={item}
              className="tag"
              color={item.length <= 4 && item.length > 2 ? "#f50" : "#55acee"}
            >
              <Link to={`/tags/${item}`}>{item}</Link>
            </Tag>
          ))}
        </div>
        <Divider plain>社交账号</Divider>
        <div className="siderbar__icon">
          <Tooltip title="github:https://github.com/cola639">
            <a
              href="https://github.com/cola639"
              target="_blank"
              rel="noreferrer"
            >
              <SvgIcon type="git" className="icon" />
            </a>
          </Tooltip>
          <Tooltip title="wechat:g18826078154">
            <span>
              <SvgIcon type="weixin" className="icon" />
            </span>
          </Tooltip>
          <Tooltip title="QQ:337507950">
            <span>
              <SvgIcon type="qq" className="icon" />
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default SiderBar;
