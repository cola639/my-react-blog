import React from "react";
import Loadable from "react-loadable";
import { Spin } from "antd";

// // const LoadableComponent = Loadable({
// //   loader: () => import("./"),
// //   loading() {
// //     return <div>正在加载……</div>;
// //   },
// // });

// // export default () => <LoadableComponent />;

// export default (loader) => {
//   return Loadable({
//     loader,
//     loading() {
//       return (
//         <Spin
//           tip="加载中"
//           size="large"
//           style={{
//             position: "fixed",
//             top: "10rem",
//             left: "50%",
//             zIndex: "999",
//           }}
//         />
//       );
//     },
//   });
// };

function loadable(loader) {
  return Loadable({
    loader,
    loading() {
      return (
        <Spin
          tip="加载中"
          size="large"
          style={{
            position: "fixed",
            top: "10rem",
            left: "50%",
            zIndex: "999",
          }}
        />
      );
    },
  });
}

export default loadable;
