import request from '@/utils/request'

/**
 * list
 * @param query
 */
export const list = (query) => {
  return request({
    url: '/ieg/enroll/list',
    method: 'get',
    params: query
  })
}

/**
 * save
 * @param obj
 */
export const save = (obj) => {
  return request({
    url: '/ieg/enroll/save',
    method: 'post',
    data: obj
  })
}

/**
 * modify
 * @param obj
 */
export const modify = (obj) => {
  return request({
    url: '/ieg/enroll/modify',
    method: 'put',
    data: obj
  })
}

/**
 * delete
 * @param id
 */
export const del = (id) => {
  return request({
    url: '/ieg/enroll/delete/' + id,
    method: 'delete'
  })
}

/**
 * 校验是否存在
 * @param obj
 */
export const checkExist = (obj) => {
  return request({
    url: '/ieg/enroll/checkExist',
    method: 'post',
    data: obj
  })
}
