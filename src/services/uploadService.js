import http from "./httpService";
import { apiUrl } from "./config.json";

const apiEndpoint = apiUrl + "/upload";

export function postImg(img) {
  return http.post(apiEndpoint, img);
}
