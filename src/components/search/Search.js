import React, { useState, useEffect } from "react";
import { List, Space } from "antd";
import queryString from "query-string";
import SvgIcon from "../common/SvgIcon";
import { searchArticles } from "../../services/searchService";
import brightKeyword from "../../utils/brightKeyword";
import { imgUrl } from "../../services/config.json";

function Search(props) {
  const [searchResult, setSearchResult] = useState();

  async function getSearchArticles() {
    const query = queryString.parse(props.location.search);

    const { data: result } = await searchArticles(query.name);

    if (result) {
      //遍历点亮关键词;
      result.map((item) => {
        item.title = brightKeyword(query.name, item.title);
        item.author = brightKeyword(query.name, item.author.name);
        return (item.content = brightKeyword(query.name, item.content));
      });
    }

    setSearchResult(result);
  }

  useEffect(() => {
    getSearchArticles(searchResult); // eslint-disable-next-line react-hooks/exhaustive-deps
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
                      __html: item.author,
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
    </section>
  );
}

export default Search;
