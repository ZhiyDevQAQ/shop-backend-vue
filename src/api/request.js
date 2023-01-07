import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 创建自定义axios
const request = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/',
  timeout: 5000
})

request.interceptors.request.use(
  function (config) {
    nprogress.start()
    return config
  })

request.interceptors.response.use(
  function (response) {
    nprogress.done()
    return response.data
  },
  function (error) {
    return Promise.reject(new Error(error.message))
  }
)

export default request
