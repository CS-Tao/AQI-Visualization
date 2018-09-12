import Mock from 'mockjs'
import urls from '../config/urls'
import DataQuery from '../config/DataQuery'
import demoApi from './demo.api'

Mock.setup({
  timeout: '100-500'
})

// Get demo
Mock.mock(new RegExp(urls.demo.getRequest), 'get', demoApi.getRequest)

// Post demo
Mock.mock(new RegExp(urls.demo.loadTestRecodsList), 'post', demoApi.postRequest)

// Get DataQuery
Mock.mock(new RegExp(DataQuery.DataQuery.getTop10), 'get', demoApi.getTop10)

// Post DataQuery
Mock.mock(new RegExp(DataQuery.DataQuery.postTop10), 'post', demoApi.postTop10)
