import Mock from 'mockjs'
import urls from '../config/urls'
import demoApi from './demo.api'

Mock.setup({
  timeout: '100-500'
})

// Get demo
Mock.mock(new RegExp(urls.demo.getRequest), 'get', demoApi.getRequest)

// Post demo
Mock.mock(new RegExp(urls.demo.loadTestRecodsList), 'post', demoApi.postRequest)
