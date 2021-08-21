import React, { useState, useContext } from "react";
import { Modal, Comment } from "antd";
import ReplyEditor from "./ReplyEditor";
import CommentContext from "../../context/CommentContext";
import UserContext from "../../context/UserContext";
import { postComment } from "../../services/commentService";

function ModalComment(props) {
  const userContext = useContext(UserContext);
  const commentContext = useContext(CommentContext);

  const [modalValue, setModalValue] = useState(""); //回复框内容
  const [submitting, setSubmitting] = useState(false); //发送按钮

  async function submit() {
    const comment = {
      comment_uid: userContext.user._id,
      comment_content: modalValue,
      comment_parent: commentContext.commentsConfig.commentId,
      to_uid: commentContext.commentsConfig.to_uid,
    };

    await postComment(props.match.params.id, comment);

    const action = {
      type: "set_show",
      show: false,
    };

    commentContext.dispatch(action);
  }

  function handleSubmit() {
    if (!modalValue) {
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setModalValue("");
      submit();
    }, 1000);
  }

  function handleShow() {
    const action = {
      type: "set_show",
      show: !commentContext.commentsConfig.show,
    };

    commentContext.dispatch(action);
  }

  return (
    <Modal
      visible={commentContext.commentsConfig.show}
      onCancel={handleShow}
      title="评论"
      style={{ top: "25%" }}
      width={600}
      footer={null}
    >
      <Comment
        content={
          <ReplyEditor
            onChange={(e) => setModalValue(e.target.value)}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={modalValue}
          />
        }
      />
    </Modal>
  );
}

export default ModalComment;
