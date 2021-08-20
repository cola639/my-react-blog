import React from "react";
import Header from "../header/Header";
import Footer from "../common/Footer";
import DetailCenter from "./DetailCenter";
import DetailContext from "../../context/DetailContext";
import "./detail.less";

function Detail(props) {
  return (
    <React.Fragment>
      <DetailContext.Provider value={{ ...props }}>
        <Header />
        <DetailCenter {...props} />
        <Footer />
      </DetailContext.Provider>
    </React.Fragment>
  );
}

export default Detail;
