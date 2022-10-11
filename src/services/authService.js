import jwtDecode from "jwt-decode";
import http from "./httpService"; //面向对象导入,使用http.get

const apiEndpoint = "/auth";

const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

//设置localStorage jwt
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getCurrentPower() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);

    if (user.isAdmin || user.isAuthor) return true;
    return null;
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const auth = {
  login,
  loginWithJwt,
  getCurrentUser,
  logout,
  getCurrentPower,
};

export default auth;
