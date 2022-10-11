import React, { useState, useEffect, useContext, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { Comment, message } from 'antd'
import { Element } from 'react-scroll'
import CommentList from './CommentList'
import ReplyEditor from './ReplyEditor'
import UserContext from '../../context/UserContext'
import CommentContext from '../../context/CommentContext'
import { getComments, postComment } from '../../services/commentService'
import { defaultComments, commentReducer } from '../../reducer/commentReducer'

function ArticleComment(props) {
  const userContext = useContext(UserContext)

  const [commentsConfig, dispatch] = useReducer(commentReducer, defaultComments)

  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')

  async function getCommentsResult() {
    const { data: comments } = await getComments(props.match.params.id)

    const action = {
      type: 'get_comments',
      comments,
    }

    dispatch(action)
  }

  //监测后台提交是否为真,为其重新ajax数据
  useEffect(() => {
    getCommentsResult() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitting, commentsConfig.show])

  async function submitComment() {
    const comment = {
      comment_uid: userContext.user._id,
      comment_content: value,
    }
    await postComment(props.match.params.id, comment)
  }

  function handleSubmit() {
    if (!userContext.user) {
      return message.error('登陆才能评论')
    }

    if (!value) {
      return message.warn('输入为空')
    }
    setSubmitting(true)
    submitComment()
    setTimeout(() => {
      setSubmitting(false)
      setValue('')
    }, 1000)
  }

  return (
    <div className="comment-container">
      <CommentContext.Provider value={{ commentsConfig, dispatch }}>
        <Element name="comment" className="element">
          {!userContext.user && (
            <div
              style={{
                margin: '15px auto',
                width: '100%',
                height: '10rem',
                textAlign: 'center',
                verticalAlign: 'center',
                backgroundColor: '#f6f6f6',
                lineHeight: '10rem',
              }}
            >
              <Link to="/sign-up">快注册账号发表评论吧!</Link>
            </div>
          )}
          {userContext.user && (
            <Comment
              content={
                <ReplyEditor
                  onChange={(e) => setValue(e.target.value)}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                  value={value}
                  userContext={userContext}
                />
              }
            />
          )}
        </Element>

        <CommentList {...props} />
      </CommentContext.Provider>
    </div>
  )
}

export default ArticleComment
