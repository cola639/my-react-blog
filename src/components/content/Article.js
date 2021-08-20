import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { List, Space, Divider } from "antd";
import SvgIcon from "../common/SvgIcon";
import { getFirstList, getMoreList } from "../../services/articleService";

function Article(props) {
  //设置useState
  const [articleList, setArticleList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => getFirstPage(), []);

  async function getFirstPage() {
    const { data: FirstPage } = await getFirstList();

    setArticleList(FirstPage);
  }

  async function moreData() {
    setPageNumber(pageNumber + 1);

    const { data: moreArticles } = await getMoreList({ pageNumber });

    if (!moreArticles.length) {
      setLoading(false);
      return setHasMore(false);
    }

    const addArticles = [...moreArticles];
    const newArticleList = [...articleList, ...addArticles];

    setArticleList(newArticleList);
    setLoading(false);
  }

  return (
    <section className="card article-container">
      <InfiniteScroll
        initialLoad={false}
        loadMore={moreData}
        hasMore={!loading && hasMore} //是否有更多,设为false下来不会再产生网络请求
        useWindow={true} //是否使用浏览器滑动条或组件UI内部滑动条默认为true
      >
        <List
          itemLayout="vertical"
          size="large"
          pagination={false}
          dataSource={articleList}
          renderItem={(item) => (
            <List.Item
              key={item._id}
              actions={[
                <Space>
                  <SvgIcon className="icon--small" type="kanguowo" />
                  {item.watchers}
                </Space>,

                <Space>
                  <SvgIcon className="icon--small" type="like" />
                  {item.likes}
                </Space>,

                <Space>
                  <SvgIcon className="icon--small" type="pinglun" />
                  {item.comments}
                </Space>,

                <Space>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item.author.name,
                    }}
                  />
                </Space>,
              ]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
      {!loading && !hasMore && <Divider>我也是有底线的啦</Divider>}
    </section>
  );
}

export default Article;