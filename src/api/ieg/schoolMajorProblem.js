import request from '@/utils/request'

/**
 * 获取问题list信息
 * @param query 查询条件
 */
export const list = (query) => {
  return request({
    url: '/ieg/school/major/problem/list',
    method: 'get',
    params: query
  })
}

/**
 * 保存院校问题信息
 * @param obj 院校问题信息
 */
export const save = (obj) => {
  return request({
    url: '/ieg/school/major/problem/save',
    method: 'post',
    data: obj
  })
}

/**
 * 修改院校问题信息
 * @param obj 院校问题信息
 */
export const modify = (obj) => {
  return request({
    url: '/ieg/school/major/problem/modify',
    method: 'put',
    data: obj
  })
}

/**
 * 删除院校问题信息
 * @param id 院校问题id
 */
export const del = (id) => {
  return request({
    url: '/ieg/school/major/problem/delete/' + id,
    method: 'delete'
  })
}
