import request from './config/service'
import DataQuery from './config/DataQuery'

export function getTop10 (format, date) {
  return request({
    url: DataQuery.DataQuery.getTop10,
    method: 'get',
    params: {format, date}
  })
}
export function getCalender (format, city, year) {
  return request({
    url: DataQuery.DataQuery.getCalender,
    method: 'get',
    params: {format, city, year}
  })
}
export function getIndex3 (format, city, year) {
  return request({
    url: DataQuery.DataQuery.getIndex3,
    method: 'get',
    params: {format, city, year}
  })
}
