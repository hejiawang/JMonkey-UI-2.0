import request from '@/utils/request'

/**
 * list
 * @param query
 */
export const list = (query) => {
  return request({
    url: '/ieg/school/submit/list',
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
    url: '/ieg/school/submit/save',
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
    url: '/ieg/school/submit/modify',
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
    url: '/ieg/school/submit/delete/' + id,
    method: 'delete'
  })
}
