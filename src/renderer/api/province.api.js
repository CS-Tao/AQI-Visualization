import request from './config/service'
import urls from './config/urls'

export default {
  // Get the names of all provinces in the country
  getProvinceName: () => {
    return request({
      url: urls.province.getProvinceName,
      method: 'get',
      params: {
        format: 'json'
      }
    })
  },
  // Get AQL data for all cities in a province
  getProvinceData: (province) => {
    return request({
      url: urls.province.getProvinceData,
      method: 'get',
      params: {
        format: 'json',
        province
      }

    })
  }
}
