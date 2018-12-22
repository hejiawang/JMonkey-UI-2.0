import request from '@/utils/request'

/**
 * 获取所有角色信息
 */
export const listAll = () => {
  return request({
    url: '/sys/role/listAll',
    method: 'get'
  })
}

/**
 * 角色分页列表
 * @param query 查询条件
 */
export const list = (query) => {
  return request({
    url: '/sys/role/list',
    method: 'get',
    params: query
  })
}

/**
 * 删除角色信息
 * @param id 角色ID
 */
export const del = (id) => {
  return request({
    url: '/sys/role/delete/' + id,
    method: 'delete'
  })
}

/**
 * 查找角色信息
 * @param id 角色信息ID
 */
export const find = (id) => {
  return request({
    url: '/sys/role/find/' + id,
    method: 'get'
  })
}

/**
 * 保存角色信息
 * @param obj 角色信息
 */
export const save = (obj) => {
  return request({
    url: '/sys/role/save',
    method: 'post',
    data: obj
  })
}

/**
 * 修改角色信息
 * @param obj 角色信息
 */
export const modify = (obj) => {
  return request({
    url: '/sys/role/modify',
    method: 'put',
    data: obj
  })
}

/**
 * 校验角色编码是否存在
 * @param id 角色id
 * @param code 角色code
 */
export const checkCode = (id, code) => {
  return request({
    url: '/sys/role/checkCode',
    data: {
      id: id,
      code: code
    },
    method: 'post'
  })
}

/**
 * 校验角色名称是否存在
 * @param id 角色id
 * @param name 角色名称
 */
export const checkName = (id, name) => {
  return request({
    url: '/sys/role/checkName',
    data: {
      id: id,
      name: name
    },
    method: 'post'
  })
}
