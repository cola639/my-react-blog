import React from "react";
import moment from "moment";
import { Comment, Avatar } from "antd";

function CustomComment({ comment, onCommit }) {
  return (
    <Comment
      id={comment._id}
      actions={[
        <span onClick={() => onCommit(comment._id, comment.comment_uid)}>
          回复
        </span>,
      ]}
      author={comment.comment_uid.name}
      avatar={<Avatar size={36}>{comment.comment_uid.name}</Avatar>}
      content={comment.comment_content}
      datetime={moment(comment.comment_datetime).format("YYYY-MM-DD HH:mm:ss")}
    >
      {comment.children &&
        comment.children.length > 0 &&
        comment.children.map(function (child) {
          return (
            <Comment
              key={child._id}
              actions={[
                <span onClick={() => onCommit(child._id, child.comment_uid)}>
                  回复
                </span>,
              ]}
              author={
                <>
                  <span>
                    {child.comment_uid.name} @ {child.to_uid.name}
                  </span>
                </>
              }
              avatar={<Avatar size={32}>{child.comment_uid.name}</Avatar>}
              content={child.comment_content}
              datetime={moment(child.comment_datetime).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            />
          );
        })}
    </Comment>
  );
}

export default CustomComment;
