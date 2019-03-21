import request from '@/utils/request'

/**
 * page list
 * @param query
 */
export const list = (query) => {
  return request({
    url: '/sys/data/scope/list',
    method: 'get',
    params: query
  })
}

/**
 * 获取数据规则信息
 */
export const listDto = () => {
  return request({
    url: '/sys/data/scope/listDto',
    method: 'get'
  })
}

/**
 * 保存数据规则
 * @param obj
 */
export const save = (obj) => {
  return request({
    url: '/sys/data/scope/save',
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
    url: '/sys/data/scope/modify',
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
    url: '/sys/data/scope/delete/' + id,
    method: 'delete'
  })
}

/**
 * 校验名称是否重复
 * @param id
 * @param name
 */
export const checkName = (id, name) => {
  return request({
    url: '/sys/data/scope/checkName',
    data: {
      id: id,
      name: name
    },
    method: 'post'
  })
}

/**
 * 校验拦截路径是否重复
 * @param id
 * @param url
 */
export const checkUrl = (id, url) => {
  return request({
    url: '/sys/data/scope/checkUrl',
    data: {
      id: id,
      url: url
    },
    method: 'post'
  })
}
