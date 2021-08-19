import React from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function Search(props) {
  return (
    <Button
      className="search__btn"
      size="large"
      shape="circle"
      icon={<SearchOutlined />}
    />
  );
}

export default Search;
