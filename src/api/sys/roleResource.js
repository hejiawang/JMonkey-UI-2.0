import request from '@/utils/request'
import qs from 'qs'

/**
 * 获取角色已授权的资源id
 * @param roleId 角色id
 */
export const findRidByRole = (roleId) => {
  return request({
    url: '/sys/role/resource/findRidByRole/' + roleId,
    method: 'get'
  })
}

/**
 * 为角色授权
 * @param roleId 角色id
 * @param rIds 资源id数组
 */
export const auth = (roleId, rIds) => {
  return request({
    url: '/sys/role/resource/auth',
    method: 'post',
    data: qs.stringify({
      roleId: roleId,
      rIds: rIds
    }, {arrayFormat: 'brackets'})
  })
}
