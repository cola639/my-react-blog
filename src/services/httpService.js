import axios from 'axios'
import { message } from 'antd'
import logger from './logService'

//axios请求路径
axios.defaults.baseURL = process.env.REACT_APP_API_URL

//axios拦截器
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500

  if (!expectedError) {
    logger.log(error) //错误日志
    message.error('An unexpected error occurrred.')
  }

  return Promise.reject(error)
})

//设置头部用户信息
function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
}

//面向对象引用http.get
export default http
