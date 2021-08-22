import React from "react";
import { Form, Button, Input } from "antd";

const { TextArea } = Input;

function ReplyEditor({ onChange, onSubmit, submitting, value, userContext }) {
  return (
    <>
      <Form.Item>
        <TextArea
          rows={4}
          onChange={onChange}
          value={value}
          placeholder="文明社会，理性评论..."
        />
      </Form.Item>
      <Form.Item>
        {userContext.user && (
          <Button
            htmlType="submit"
            loading={submitting}
            onClick={onSubmit}
            type="primary"
          >
            发布评论
          </Button>
        )}
        {!userContext.user && <Button disabled>登陆才能发表评论哦</Button>}
      </Form.Item>
    </>
  );
}

export default ReplyEditor;
