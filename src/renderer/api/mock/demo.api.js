import Mock from 'mockjs'
import adminJson from '@/assets/mapdata/adminDiv'

export default {
  // Get demo
  getRequest: config => {
    console.log('Mock: ' + config.url)
    return {
      time: Mock.mock('@datetime')
    }
  },
  getJsonURL: config => {
    console.log('Mock: ' + config.url)
    return adminJson
  },
  // Post demo
  postRequest: config => {
    console.log('Mock: ' + config.url)
    return {
      time: Mock.mock('@datetime')
    }
  }
}
