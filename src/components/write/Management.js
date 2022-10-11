import React from "react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { Table, Input, Button, Space, message, Popconfirm, Image } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getArticles, deleteArticle } from "../../services/articleService";
import { deleteLikes } from "../../services/likesService";
import { imgUrl } from "../../services/config.json";
import "./management.less";

class Management extends React.Component {
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

  //删除数据
  handleDelete = async (articleId) => {
    const originalArticles = this.state.data;

    const articles = this.state.data.filter((item) => item._id !== articleId);

    this.setState({ data: articles });

    try {
      await deleteArticle(articleId);
      await deleteLikes(articleId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) message.warn("删除失败");
      this.setState({ data: originalArticles });
    }
  };

  //搜索
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  //重置
  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const { data } = this.state;

    const columns = [
      {
        title: "文章标题",
        dataIndex: "title",
        //中文排序文章标题
        sorter: (a, b) => a.title.localeCompare(b.title),
        key: "title",
        width: "30%",
        ...this.getColumnSearchProps("title"),
      },
      {
        title: "封面图",
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
          else return "图片为空";
        },
      },
      {
        title: "文章描述",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "操作",
        dataIndex: "_id",
        render: (articleId) => (
          <Space size="middle">
            <Link to={`/write/add/${articleId}`} className="ant-btn">
              修改
            </Link>

            <Popconfirm
              title="Deleted can not return,are you sure？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => this.handleDelete(articleId)}
            >
              <Button>删除</Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];
    return (
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={data}
        locale={{
          triggerDesc: "降序排列",
          triggerAsc: "升序排列",
          cancelSort: "取消排列",
        }}
        pagination={{ hideOnSinglePage: true }}
      />
    );
  }
}

export default Management;
