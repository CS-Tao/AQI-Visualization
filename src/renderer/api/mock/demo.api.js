import Mock from 'mockjs'

export default {
  // Get demo
  getDemo: config => {
    console.log('Mock: ' + config.url)
    return {
      time: Mock.mock('@datetime')
    }
  },
  // Post demo
  postDemo: config => {
    console.log('Mock: ' + config.url)
    return {
      time: Mock.mock('@datetime')
    }
  },
  // Get Top10
  getTop10: config => {
    console.log('Mock: ' + config.url)
    return {
      data: {
        '省份': ['北京', '天津', '上海', '重庆', '武汉', '长沙', '南昌', '广州', '深圳', '珠海'],
        'aqi': [100, 90, 80, 90, 100, 100, 90, 80, 90, 100],
        'so2': [10, 20, 30, 20, 10, 10, 20, 30, 20, 10],
        '粉尘': [30, 40, 30, 20, 60, 30, 20, 30, 10, 90]
      }
    }
  },
  // Post Top10
  postTop10: config => {
    console.log('Mock: ' + config.url)
    return {
      data: {
        '省份': ['北京', '天津', '上海', '重庆', '武汉', '长沙', '南昌', '广州', '深圳', '珠海'],
        'aqi': [100, 90, 80, 90, 100, 100, 90, 80, 90, 100],
        'so2': [10, 20, 30, 20, 10, 10, 20, 30, 20, 10],
        '粉尘': [30, 40, 30, 20, 60, 30, 20, 30, 10, 90]
      }
    }
  }
}
