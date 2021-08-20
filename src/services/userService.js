import http from "./httpService"; //面向对象导入,使用http.get
import { apiUrl } from "./config.json";

const apiEndpoint = apiUrl + "/users";

export async function register(user) {
  return await http.post(apiEndpoint, {
    name: user.username,
    password: user.password,
    email: user.email,
  });
}
