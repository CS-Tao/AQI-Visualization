import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  withCredentials: true
})

service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(
  response => response,
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 3000,
      showClose: true
    })
    console.log(error)
    return Promise.reject(error)
  })

export default service
