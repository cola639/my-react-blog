import loadable from "./loadable";

export const Home = loadable(() => import("../components/home/Home"));
export const Register = loadable(() =>
  import("../components/register/Register")
);
export const Write = loadable(() => import("../components/write/Write"));
export const Detail = loadable(() => import("../components/detail/Detail"));
