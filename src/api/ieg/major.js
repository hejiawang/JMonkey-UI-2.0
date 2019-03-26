import request from '@/utils/request'

/**
 * 获取专业树信息
 * @param query 查询对象
 */
export const tree = (query) => {
  return request({
    url: '/ieg/major/tree',
    method: 'get',
    params: query
  })
}

/**
 * 新增专业信息
 * @param obj 专业信息
 */
export const save = (obj) => {
  return request({
    url: '/ieg/major/save',
    method: 'post',
    data: obj
  })
}

/**
 * 修改专业信息
 * @param obj 专业信息
 */
export const modify = (obj) => {
  return request({
    url: '/ieg/major/modify',
    method: 'put',
    data: obj
  })
}

/**
 * 获取专业信息
 * @param id 专业id
 */
export const findDto = (id) => {
  return request({
    url: '/ieg/major/findDto/' + id,
    method: 'get'
  })
}

/**
 * 删除专业信息
 * @param id 专业id
 */
export const del = (id) => {
  return request({
    url: '/ieg/major/delete/' + id,
    method: 'delete'
  })
}
