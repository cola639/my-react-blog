import http from "./httpService";

const apiEndpoint = "/upload";

export function postImg(img) {
  return http.post(apiEndpoint, img);
}
