import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

function SearchInput(props) {
  const [isVisible, setIsVisible] = useState(false);

  function handleSearch(value) {
    if (!value.trim()) return;
    setIsVisible(false);
    props.history.push(`/search?name=${value}`);
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
        closable={false}
        destroyOnClose
        centered
        width={600}
        footer={null} //取消底部多余显示
        style={{
          textAlign: "center",
          top: "-50vw",
        }}
      >
        <Search
          placeholder="input search text"
          enterButton="Search"
          allowClear
          size="large"
          onSearch={handleSearch}
        />
      </Modal>
    </React.Fragment>
  );
}

export default SearchInput;
