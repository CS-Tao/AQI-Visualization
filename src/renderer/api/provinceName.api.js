import request from './config/service'
import urls from './config/urls'

export default {
  // Get demo
  getRequest_provinceName: () => {
    return request({
      url: urls.demo.getProvinceName,
      method: 'get'
    })
  },
  // Post demo
  postRequest: (param1, param2) => {
    return request({
      url: urls.demo.postRequest,
      method: 'post',
      data: {
        param1, param2
      }
    })
  }
}
