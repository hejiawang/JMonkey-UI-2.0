import request from '@/utils/request'

/**
 * list all
 * @param query
 */
export const list = (query) => {
  return request({
    url: '/ieg/school/faculty/list',
    method: 'get',
    params: query
  })
}

/**
 * 新增院系信息
 * @param obj 院系信息
 */
export const save = (obj) => {
  return request({
    url: '/ieg/school/faculty/save',
    method: 'post',
    data: obj
  })
}

/**
 * 修改院系信息
 * @param obj 院系信息
 */
export const modify = (obj) => {
  return request({
    url: '/ieg/school/faculty/modify',
    method: 'put',
    data: obj
  })
}

/**
 * 删除院系信息
 * @param id 院系id
 */
export const del = (id) => {
  return request({
    url: '/ieg/school/faculty/delete/' + id,
    method: 'delete'
  })
}
