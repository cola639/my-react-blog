import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { List, Space, Divider } from "antd";
import SvgIcon from "../common/SvgIcon";
import { getFirstList, getMoreList } from "../../services/articleService";
import debounce from "../../utils/debounce";
import { imgUrl } from "../../services/config.json";

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

    //小于9条数据显示底线
    if (FirstPage.length < 9) setHasMore(false);
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
        loadMore={debounce(moreData, 1000)}
        hasMore={!loading && hasMore} //是否有更多,设为false下来不会再产生网络请求
        useWindow={true} //是否使用浏览器滑动条或组件UI内部滑动条默认为true
      >
        <List
          itemLayout="vertical"
          size="large"
          pagination={false}
          dataSource={articleList}
          renderItem={(item) => (
            <div
              className="article-list__article"
              onClick={() => props.history.push(`/articles/${item._id}`)}
            >
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
                  item.img ? (
                    <img
                      style={{ width: "22rem" }}
                      alt="logo"
                      src={`${imgUrl}${item.img}`}
                    />
                  ) : null
                }
              >
                <List.Item.Meta
                  title={
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item.title,
                      }}
                    />
                  }
                  description={
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />
                  }
                />
              </List.Item>
            </div>
          )}
        />
      </InfiniteScroll>
      {!loading && !hasMore && <Divider>我也是有底线的啦</Divider>}
    </section>
  );
}

export default Article;
