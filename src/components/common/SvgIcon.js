import React from "react";
import PropTypes from "prop-types";

// iconfont svg
const SvgIcon = (props) => {
  return (
    <svg className={props.className} aria-hidden="true">
      <use xlinkHref={`#icon-${props.type}`} />
    </svg>
  );
};

SvgIcon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

SvgIcon.defaultProps = {
  className: "icon",
};

export default SvgIcon;
