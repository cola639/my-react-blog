import React, { useContext, useEffect, useState } from "react";
import CustomComment from "./CustomComment";
import ModalComment from "./ModalComment";
import CommentContext from "../../context/CommentContext";
import { transformTree } from "../../utils/treeToList";

function CommentList(props) {
  const commentContext = useContext(CommentContext);
  const [mapComments, setMapComments] = useState([]);

  function setComments() {
    setMapComments(transformTree(commentContext.commentsConfig.comments));
  }

  useEffect(() => {
    setComments();
  }, [commentContext.commentsConfig.comments]);

  function handleCommit(commentId, uid) {
    const action = {
      type: "modal_comment",
      commentId,
      to_uid: uid._id,
      show: true,
    };

    commentContext.dispatch(action);
  }

  return (
    <>
      {mapComments.map(function (comment) {
        return (
          <CustomComment
            key={comment._id}
            comment={comment}
            onCommit={handleCommit}
          />
        );
      })}
      <ModalComment {...props} />
    </>
  );
}

export default CommentList;