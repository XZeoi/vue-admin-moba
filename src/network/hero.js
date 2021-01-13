import {request} from './request'

export function postHeroData(param) {
  return request({
    url: 'heroes',
    method: 'post',
    data: param
  })
}

export function getHeroData() {
  return request({
    url: 'heroes',
    method: 'get'
  })
}

export function putHeroData(id, param) {
  return request({
    url: `heroes/${id}`,
    method: 'put',
    data: param
  })
}

export function getHeroDataById(id) {
  return request({
    url: `heroes/${id}`
    // params: {
    //   id
    // }
  })
}

export function deleteHeroDataById(id) {
  return request({
    url: `heroes/${id}`,
    method: 'delete'
  })
}