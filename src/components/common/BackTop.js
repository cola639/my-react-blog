import React from "react";
import { BackTop } from "antd";
import SvgIcon from "./SvgIcon";

function Back(props) {
  return (
    <div>
      <BackTop>
        <SvgIcon type="rocket" className="icon" />
      </BackTop>
    </div>
  );
}

export default Back;
