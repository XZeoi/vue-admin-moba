import { request } from './request'

export function getAdData() {
  return request({
    url: 'ad',
    method: 'get'
  })
}

export function postAdData(param) {
  return request({
    url: 'ad',
    method: 'post',
    data: param
  })
}

export function deleteAdData(id) {
  return request({
    url: `ad/${id}`,
    method: 'delete'
  })
}