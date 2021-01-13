import {request} from './request'

export function postCategoryData(param) {
  return request({
    url: 'categories',
    method: 'post',
    data: param
  })
}

export function getCategoryData() {
  return request({
    url: 'categories'
  })
}

export function getCategoryDataById(id) {
  return request({
    url: `categories/${id}`
    // params: {
    //   id
    // }
  })
}

export function putCategoryData(id, param) {
  return request({
    url: `categories/${id}`,
    method: 'put',
    data: param
  })
}

export function deleteCategoryDataById(id) {
  return request({
    url: `categories/${id}`,
    method: 'delete'
  })
}