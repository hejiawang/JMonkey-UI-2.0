import request from '@/utils/request'

/**
 * 系统用户数量、角色数量、部门数量统计
 */
export const base = () => {
  return request({
    url: '/sys/count/base',
    method: 'get'
  })
}

/**
 * 用户角色分布统计
 */
export const userRole = () => {
  return request({
    url: '/sys/count/userRole',
    method: 'get'
  })
}

/**
 * 用户部门分布统计
 */
export const userDept = () => {
  return request({
    url: '/sys/count/userDept',
    method: 'get'
  })
}
