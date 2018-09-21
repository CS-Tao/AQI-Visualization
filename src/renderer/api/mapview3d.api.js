import request from './config/service'
import urls from './config/urls'

export default {
  getAllDataInDay: (date) => {
    return request({
      url: urls.mapview3d.getAllDataInDay,
      method: 'get',
      params: {
        format: 'json',
        date
      }
    })
  }
}
