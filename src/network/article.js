import {request} from './request'

export function postArticleData(param) {
  return request({
    url: 'articles',
    method: 'post',
    data: param
  })
}

export function getArticleData() {
  return request({
    url: 'articles'
  })
}

export function getArticleDataById(id) {
  return request({
    url: `articles/${id}`
    // params: {
    //   id
    // }
  })
}

export function putArticleData(id, param) {
  return request({
    url: `articles/${id}`,
    method: 'put',
    data: param
  })
}

export function deleteArticleDataById(id) {
  return request({
    url: `articles/${id}`,
    method: 'delete'
  })
}