import {upload} from './request'

export function uploadImg(param) {
  return upload({
    url: '/',
    method: 'post',
    data: param
  })
}