import React, { useState, useEffect } from "react";
import { List, Space } from "antd";
import queryString from "query-string";
import SvgIcon from "../common/SvgIcon";
import { searchArticles } from "../../services/searchService";
import brightKeyword from "../../utils/brightKeyword";

function Search(props) {
  const [searchResult, setSearchResult] = useState();

  async function getSearchArticles() {
    const query = queryString.parse(props.location.search);

    const { data: result } = await searchArticles(query);

    //遍历点亮关键词;
    result.map((item) => {
      item.title = brightKeyword(query.name, item.title);
      item.author = brightKeyword(query.name, item.author.name);
      item.content = brightKeyword(query.name, item.content);
    });

    setSearchResult(result);
  }

  useEffect(() => {
    getSearchArticles(searchResult);
  }, [props.location.search]);

  return (
    <section className="card article-container">
      <List
        itemLayout="vertical"
        size="large"
        dataSource={searchResult}
        renderItem={(item) => (
          <div
            className="article-list__article"
            onClick={() => window.open(`/articles/${item._id}`)}
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
                      __html: item.author,
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
    </section>
  );
}

export default Search;
