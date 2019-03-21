import request from '@/utils/request'

/**
 * page list
 * @param query
 */
export const list = (query) => {
  return request({
    url: '/sys/data/scope/rule/list',
    method: 'get',
    params: query
  })
}

/**
 * 保存数据规则
 * @param obj
 */
export const save = (obj) => {
  return request({
    url: '/sys/data/scope/rule/save',
    method: 'post',
    data: obj
  })
}

/**
 * 修改数据规则
 * @param obj
 */
export const modify = (obj) => {
  return request({
    url: '/sys/data/scope/rule/modify',
    method: 'put',
    data: obj
  })
}

/**
 * 删除数据规则
 * @param id
 */
export const del = (id) => {
  return request({
    url: '/sys/data/scope/rule/delete/' + id,
    method: 'delete'
  })
}
