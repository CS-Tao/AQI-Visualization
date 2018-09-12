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
    url: DataQuery.DataQuery.getTop10,
    method: 'post',
    data: {
      date
    }
  })
}
