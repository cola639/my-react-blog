import React, { useState, useEffect } from "react";
import { List, Space } from "antd";
import SvgIcon from "./SvgIcon";
import { searchCategory } from "../../services/searchService";

function Tag(props) {
  const [category, setCategory] = useState("");

  async function getCategory() {
    const { data: result } = await searchCategory(props.match.params.id);

    setCategory(result);
  }

  useEffect(() => {
    getCategory();
  }, [props.match.params.id]);

  return (
    <section className="card article-container">
      <List
        itemLayout="vertical"
        size="large"
        dataSource={category}
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
                      __html: item.author.name,
                    }}
                  />
                </Space>,
              ]}
              extra={<img width={272} alt="logo" src={item.img} />}
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

export default Tag;
