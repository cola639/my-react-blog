// import React, { useState, useEffect } from "react";
// import { Row, Col } from "antd";
// import Content from "./Content";
// import Interactive from "./Interactive";
// import SiderBar from "../content/SiderBar";
// import Navigation from "./Navigation";
// import ArticleContext from "../../context/ArticleContext";
// import { getArticle } from "../../services/articleService";

// function DetailCenter(props) {
//   const [article, setArticle] = useState([]);

//   async function getArticleDetail() {
//     try {
//       const { data: article } = await getArticle(props.match.params.id);

//       setArticle(article);
//     } catch (ex) {
//       if (ex.response && ex.response.status === 404)
//         return props.history.push("/not-found");
//     }
//   }

//   useEffect(() => {
//     getArticleDetail();
//   }, []);
//   return (
//     <ArticleContext.Provider value={{ article }}>
//       <Row
//         className="container block  main detail-container"
//         justify="space-between"
//       >
//         <Interactive {...props} />
//         <Col xs={24} sm={17} md={17} lg={17} xl={16}>
//           <Content {...props} />
//         </Col>
//         <Col xs={0} sm={6} md={6} lg={6} xl={7} className="detail-siderbar">
//           <SiderBar />
//           <Navigation />
//         </Col>
//       </Row>
//     </ArticleContext.Provider>
//   );
// }

// export default DetailCenter;
