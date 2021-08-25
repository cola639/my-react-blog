import React from "react";
import Highlighter from "react-highlight-words";
import { Table, Input, Button, Space, message, Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getUsers, deleteUser, putUser } from "../../services/userService";
import "./management.less";

class Management extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    data: [],
  };

  async componentDidMount() {
    const { data: users } = await getUsers();

    this.setState({ data: users });
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
    filterIcon: (filtered) => <SearchOutlined />,
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
  handleDelete = async (userId) => {
    const originalUsers = this.state.data;

    const users = this.state.data.filter((item) => item._id !== userId);

    this.setState({ data: users });

    try {
      await deleteUser(userId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) message.warn("删除失败");
      this.setState({ data: originalUsers });
    }
  };

  handleOpen = async (userId) => {
    try {
      await putUser(userId);
      message.success("升级权限成功");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        message.error("升级权限出错了");
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
        title: "用户名",
        dataIndex: "name",
        //中文排序文章标题
        sorter: (a, b) => a.title.localeCompare(b.title),
        key: "name",
        width: "30%",
        ...this.getColumnSearchProps("name"),
      },

      {
        title: "用户邮箱",
        dataIndex: "email",
        key: "email",
        ...this.getColumnSearchProps("email"),
      },
      {
        title: "操作",
        dataIndex: "_id",
        render: (userId) => (
          <Space size="middle">
            <Popconfirm
              title="确定为用户升级权限吗"
              okText="Yes"
              cancelText="No"
              onConfirm={() => this.handleOpen(userId)}
            >
              <Button>开通发布权限</Button>
            </Popconfirm>
            <Popconfirm
              title="Deleted can not return,are you sure？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => this.handleDelete(userId)}
            >
              <Button>删除用户</Button>
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
