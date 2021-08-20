//初始值
export const defaultComments = {
  comments: [], //评论数据
  commentId: "",
  to_uid: "",
  show: false,
};

//判断是否弹出 tip:不能直接修改state
export function commentReducer(state, action) {
  switch (action.type) {
    case "get_comments":
      return { ...state, comments: action.comments };
    case "modal_comment":
      return {
        ...state,
        commentId: action.commentId,
        show: action.show,
        to_uid: action.to_uid,
      };
    case "set_show":
      return { ...state, show: action.show };
    default:
      return state;
  }
}
