import request from './config/service'
import DataQuery from './config/DataQuery'

export function getTop10 (date) {
  return request({
    url: DataQuery.DataQuery.getTop10,
    method: 'get',
    params: date
  })
}
export function postTop10 (date) {
  return request({
    url: DataQuery.DataQuery.postTop10,
    method: 'post',
    data: {
      date
    }
  })
}
export function getCalender (city) {
  return request({
    url: DataQuery.DataQuery.getCalender,
    method: 'get',
    params: city
  })
}
export function postCalender (city) {
  return request({
    url: DataQuery.DataQuery.postCalender,
    method: 'post',
    data: {
      city
    }
  })
}
