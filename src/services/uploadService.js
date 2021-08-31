import http from "./httpService";
import { apiUrl } from "./config.json";

const apiEndpoint = apiUrl + "/upload";

export function postImg(formData) {
  return http.post(apiEndpoint, formData);
}
