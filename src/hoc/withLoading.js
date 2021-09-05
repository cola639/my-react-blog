import React from "react";
function WithLoading(Component) {
  //逻辑
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return <p>Fetching data...</p>;
  };
}
export default WithLoading;
