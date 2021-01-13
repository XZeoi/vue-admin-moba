import {request} from './request'

export function postEquipmentData(param) {
  return request({
    url: 'equipments',
    method: 'post',
    data: param
  })
}

export function getEquipmentData() {
  return request({
    url: 'equipments',
    method: 'get'
  })
}

export function putEquipmentData(id, param) {
  return request({
    url: `equipments/${id}`,
    method: 'put',
    data: param
  })
}

export function getEquipmentDataById(id) {
  return request({
    url: `equipments/${id}`
    // params: {
    //   id
    // }
  })
}

export function deleteEquipmentDataById(id) {
  return request({
    url: `equipments/${id}`,
    method: 'delete'
  })
}