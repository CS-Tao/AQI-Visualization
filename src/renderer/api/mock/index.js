import Mock from 'mockjs'
import urls from '../config/urls'
import DataQuery from '../config/DataQuery'
import demoApi from './demo.api'
import dataQuery from './dataQuery'

Mock.setup({
  timeout: '100-500'
})

// Get demo
Mock.mock(new RegExp(urls.demo.getRequest), 'get', demoApi.getJsonURL)

// Post demo
Mock.mock(new RegExp(urls.demo.loadTestRecodsList), 'post', demoApi.postRequest)

// Get Top10
Mock.mock(new RegExp(DataQuery.DataQuery.getTop10), 'get', dataQuery.getTop10)

// Get Calender
Mock.mock(new RegExp(DataQuery.DataQuery.getCalender), 'get', dataQuery.getCalender)

// Get Index3
Mock.mock(new RegExp(DataQuery.DataQuery.getIndex3), 'get', dataQuery.getIndex3)
