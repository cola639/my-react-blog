import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Image, Space, message, Popconfirm, Button } from "antd";
import { getFirstList, deleteArticle } from "../../services/articleService";
import { deleteLikes } from "../../services/likesService";

function Published(props) {
  const [data, setData] = useState();

  async function getCurrentPage() {
    const { data: articles } = await getFirstList();
    setData(articles);
  }

  useEffect(() => {
    getCurrentPage();
  }, []);

  //删除数据
  async function handleDelete(articleId) {
    const articles = data.filter((item) => item._id !== articleId);
    setData(articles);
    try {
      await deleteArticle(articleId);
      await deleteLikes(articleId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) message.warn("删除失败");
    }
  }

  //设置文章表格内容
  const columns = [
    {
      title: "文章标题",
      dataIndex: "title",
      //中文排序文章标题
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "封面图片",
      dataIndex: "img",
      render: (img) => {
        if (img) return <Image width={100} src={img} />;
        else return "图片为空";
      },
    },
    {
      title: "文章描述",
      dataIndex: "description",
    },
    {
      title: "操作",
      dataIndex: "_id",
      render: (articleId) => (
        <Space size="middle">
          <Link to={`/write/changeArticle/${articleId}`}>修改</Link>

          <Popconfirm
            title="Deleted can not return,are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(articleId)}
          >
            <Button to="/">删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
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
    </div>
  );
}

export default Published;
