import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function Search(props) {
  const [isVisible, setIsVisible] = useState(false);

  function handleSearch(e) {
    if (!e.currentTarget.value.trim()) return;
    setIsVisible(false);
    props.history.push(`/search?name=${e.currentTarget.value}`);
  }

  return (
    <React.Fragment>
      <Button
        className="search__btn"
        size="large"
        shape="circle"
        icon={<SearchOutlined />}
        onClick={() => {
          setIsVisible(true);
        }}
      />
      <Modal
        visible={isVisible}
        onOk={() => {
          setIsVisible(false);
        }}
        onCancel={() => {
          setIsVisible(false);
        }}
        destroyOnClose
        centered //居中
        width={600}
        footer={null} //取消底部多余显示
        style={{ textAlign: "center", borderRadius: "12px", top: "-50vw" }}
      >
        <Input
          placeholder="Enter your search"
          prefix={<SearchOutlined />}
          bordered={false}
          onPressEnter={handleSearch}
        />
      </Modal>
    </React.Fragment>
  );
}

export default Search;
