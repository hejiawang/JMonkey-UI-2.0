import request from '@/utils/request'

/**
 * 获取所有系统信息
 * @param query 查询条件
 */
export const list = () => {
  return request({
    url: '/sys/system/list',
    method: 'get'
  })
}

/**
 * 删除系统信息
 * @param id 系统信息id
 */
export const del = (id) => {
  return request({
    url: '/sys/system/delete/' + id,
    method: 'delete'
  })
}

/**
 * 获取系统信息
 * @param id 系统信息id
 */
export const find = (id) => {
  return request({
    url: '/sys/system/find/' + id,
    method: 'get'
  })
}

/**
 * 保存系统信息
 * @param obj 系统信息
 */
export const save = (obj) => {
  return request({
    url: '/sys/system/save',
    method: 'post',
    data: obj
  })
}

/**
 * 修改系统信息
 * @param obj 系统信息
 */
export const modify = (obj) => {
  return request({
    url: '/sys/system/modify',
    method: 'put',
    data: obj
  })
}
