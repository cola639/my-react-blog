import React from "react";
import Highlighter from "react-highlight-words";
import { Table, Input, Button, Space, Image } from "antd";
import UploadImg from "../common/UploadImg";
import { SearchOutlined } from "@ant-design/icons";
import { getArticles } from "../../services/articleService";
import { imgUrl } from "../../services/config.json";

class ImgManagement extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    data: [],
  };

  async componentDidMount() {
    const { data: articles } = await getArticles();
    this.setState({ data: articles });
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  //??????
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  //??????
  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const { data } = this.state;

    const columns = [
      {
        title: "????????????",
        dataIndex: "title",
        //????????????????????????
        sorter: (a, b) => a.title.localeCompare(b.title),
        key: "title",
        width: "30%",
        ...this.getColumnSearchProps("title"),
      },
      {
        title: "?????????",
        dataIndex: "img",
        key: "img",
        width: "20%",
        render: (img) => {
          if (img)
            return (
              <Image
                src={`${imgUrl}${img}`}
                style={{ width: "15rem", height: "10rem" }}
              ></Image>
            );
          else return "????????????";
        },
      },

      {
        title: "????????????",
        dataIndex: "_id",
        render: (articleId) => <UploadImg articleId={articleId} />,
      },
    ];
    return (
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={data}
        locale={{
          triggerDesc: "????????????",
          triggerAsc: "????????????",
          cancelSort: "????????????",
        }}
        pagination={{ hideOnSinglePage: true }}
      />
    );
  }
}

export default ImgManagement;
