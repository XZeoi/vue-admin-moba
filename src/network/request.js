import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    // baseURL: 'http://localhost:3000/admin/api',
    baseURL: 'http://localhost:3000/admin/api/rest',
    timeout: 5000
  })

  instance.interceptors.request.use(config => {

    return config
  }, err=>{

  })

  instance.interceptors.response.use(res => {

    return res.data
  }, err => {

  })

  return instance(config)
}

export function upload(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:3000/admin/api/upload'
  })

  instance.interceptors.request.use(config => {

    return config
  }, err=>{

  })

  instance.interceptors.response.use(res => {

    return res.data
  }, err => {

  })

  return instance(config)
}