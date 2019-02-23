import request from '@/utils/request'

/**
 * 获取部门树形数据
 */
export const tree = () => {
  return request({
    url: '/sys/dept/tree',
    method: 'get'
  })
}

/**
 * 保存dept信息
 * @param obj dept信息
 */
export const save = (obj) => {
  return request({
    url: '/sys/dept/save',
    method: 'post',
    data: obj
  })
}

/**
 * 修改dept信息
 * @param obj dept信息
 */
export const modify = (obj) => {
  return request({
    url: '/sys/dept/modify',
    method: 'put',
    data: obj
  })
}

/**
 * 获取dept信息
 * @param id dept id
 */
export const find = (id) => {
  return request({
    url: '/sys/dept/find/' + id,
    method: 'get'
  })
}

/**
 * 删除dept
 * @param id dept id
 */
export const del = (id) => {
  return request({
    url: '/sys/dept/delete/' + id,
    method: 'delete'
  })
}

/**
 * 校验部门编码是否存在
 * @param id 部门id
 * @param code 部门编码
 */
export const checkCode = (id, code) => {
  return request({
    url: '/sys/dept/checkCode',
    data: {
      id: id,
      code: code
    },
    method: 'post'
  })
}

/**
 * 部门中有哪些用户
 */
export const deptUserList = () => {
  return request({
    url: '/sys/dept/deptUserList',
    method: 'get'
  })
}
