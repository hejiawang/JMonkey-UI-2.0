import request from '@/utils/request'

/**
 * 用户list
 * @param query 查询条件
 */
export const list = (query) => {
  return request({
    url: '/sys/user/list',
    method: 'get',
    params: query
  })
}

/**
 * 保存用户信息
 * @param obj 用户信息
 */
export const save = (obj) => {
  return request({
    url: '/sys/user/save',
    method: 'post',
    data: obj
  })
}

/**
 * 修改用户信息
 * @param obj 用户信息
 */
export const modify = (obj) => {
  return request({
    url: '/sys/user/modify',
    method: 'put',
    data: obj
  })
}

/**
 * 根据用户id删除用户信息
 * @param id 用户id
 */
export const del = (id) => {
  return request({
    url: '/sys/user/delete/' + id,
    method: 'delete'
  })
}

/**
 * 获取用户dto信息
 * @param id 用户id
 */
export const findDto = (id) => {
  return request({
    url: '/sys/user/findDto/' + id,
    method: 'get'
  })
}

/**
 * 校验用户登录名是否存在
 * @param id 用户id
 * @param username 用户登录名
 */
export const checkUsername = (id, username) => {
  return request({
    url: '/sys/user/checkUsername',
    data: {
      id: id,
      username: username
    },
    method: 'post'
  })
}
