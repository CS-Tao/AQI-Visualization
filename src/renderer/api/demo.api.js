import request from './config/service'
import urls from './config/urls'

export default {
  // Get demo
  getRequest: () => {
    return request({
      url: urls.demo.getRequest,
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
