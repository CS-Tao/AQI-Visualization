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
  }
}
