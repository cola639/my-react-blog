import React, { useState, useEffect, useContext } from "react";
import { Link, Events } from "react-scroll";
import { Button, Tooltip, message } from "antd";
import QRCode from "qrcode.react";
import SvgIcon from "../common/SvgIcon";
import UserContext from "../../context/UserContext";
import { getLikes, putLiked } from "../../services/likesService";

function Interactive(props) {
  const userContext = useContext(UserContext);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likesId, setLikesId] = useState("");
  const [show, setShow] = useState(false);

  async function getArticleLikes() {
    const { data: result } = await getLikes(props.match.params.id);
    const articleLikes = result[0]["users"];
    setLikes(articleLikes.length);
    setLikesId(result["0"]["_id"]);
    try {
      const index = articleLikes.findIndex(
        (item) => item._id === userContext.user._id
      );

      if (index !== -1) {
        setLiked(true);
      }
    } catch (error) {}
  }

  useEffect(() => {
    getArticleLikes();

    bindScroll();
    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.user]);

  async function handleLiked() {
    if (!userContext.user) {
      return message.error("登陆才能点赞");
    }

    const originalLiked = liked;
    const originalLikes = likes;

    if (originalLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);

    try {
      await putLiked({
        _id: likesId,
        articleId: props.match.params.id,
        userId: userContext.user._id,
        liked,
      });
    } catch (ex) {
      message.warn("点赞未成功哦");
      setLiked(originalLiked);
      setLikes(originalLikes);
    }
  }

  function bindScroll() {
    Events.scrollEvent.register("begin");
    Events.scrollEvent.register("end");
  }

  return (
    <section className="interactive">
      <span>{likes}</span>
      <Tooltip title="点赞">
        <Button
          onClick={handleLiked}
          className="interactive__btn"
          size="large"
          style={{ marginBottom: "2rem" }}
          shape="circle"
          icon={
            <SvgIcon
              type={liked ? "dianzan1" : "dianzan"}
              className="icon--middle "
            />
          }
        />
      </Tooltip>
      <Tooltip title="评论">
        <Button
          className="interactive__btn"
          size="large"
          style={{ marginBottom: "2rem" }}
          shape="circle"
        >
          <Link
            activeClass="active"
            to="comment"
            spy={true}
            smooth={true}
            duration={500}
          >
            <SvgIcon type="pinglun" className="icon--middle " />
          </Link>
        </Button>
      </Tooltip>
      <Tooltip title="转发">
        <Button
          onClick={() => setShow(!show)}
          className="interactive__btn interactive__parent"
          size="large"
          style={{ marginBottom: "2rem" }}
          shape="circle"
          icon={<SvgIcon type="fenxiang" className="icon--middle" />}
        />
        {show && (
          <QRCode
            className="interactive__qr"
            value={props.match.url} //value参数为生成二维码的链接
            size={150} //二维码的宽高尺寸
            fgColor="#000000" //二维码的颜色
            includeMargin={true} //设置外边距
          />
        )}
      </Tooltip>
    </section>
  );
}

export default Interactive;
