import request from '@/utils/request'

/**
 * 分页查询信息
 * @param query query
 */
export const list = (query) => {
  return request({
    url: '/ieg/school/list',
    method: 'get',
    params: query
  })
}

/**
 * 保存院校信息
 * @param obj 院校信息
 */
export const save = (obj) => {
  return request({
    url: '/ieg/school/save',
    method: 'post',
    data: obj
  })
}

/**
 * 修改院校信息
 * @param obj 院校信息
 */
export const modify = (obj) => {
  return request({
    url: '/ieg/school/modify',
    method: 'put',
    data: obj
  })
}

/**
 * 删除院校信息
 * @param id 院校信息id
 */
export const del = (id) => {
  return request({
    url: '/ieg/school/delete/' + id,
    method: 'delete'
  })
}

/**
 * 获取院校Dto信息
 * @param id 院校id
 */
export const findDto = (id) => {
  return request({
    url: '/ieg/school/findDto/' + id,
    method: 'get'
  })
}
