import request from '@/utils/request'

export const tree = (query) => {
  return request({
    url: '/ieg/environment/tree',
    method: 'get',
    params: query
  })
}

/**
 * 校验是否存在
 * @param obj
 */
export const checkExist = (obj) => {
  return request({
    url: '/ieg/environment/checkExist',
    method: 'post',
    data: obj
  })
}

/**
 * save
 * @param obj
 */
export const save = (obj) => {
  return request({
    url: '/ieg/environment/save',
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
    url: '/ieg/environment/modify',
    method: 'put',
    data: obj
  })
}

/**
 * findByAreaCity
 * @param areaCity
 */
export const findByAreaCity = (areaCity) => {
  return request({
    url: '/ieg/environment/findByAreaCity/' + areaCity,
    method: 'get'
  })
}

/**
 * delete
 * @param id
 */
export const del = (id) => {
  return request({
    url: '/ieg/environment/delete/' + id,
    method: 'delete'
  })
}
