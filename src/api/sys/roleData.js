import request from '@/utils/request'
import qs from 'qs'

/**
 * 获取角色授权的数据规则
 * @param roleId
 */
export const findByRole = (roleId) => {
  return request({
    url: '/sys/role/data/findByRole/' + roleId,
    method: 'get'
  })
}

/**
 * 为角色授权数据规则
 * @param roleId
 * @param ruleIds
 */
export const auth = (roleId, ruleIds) => {
  return request({
    url: '/sys/role/data/auth',
    method: 'post',
    data: qs.stringify({
      roleId: roleId,
      ruleIds: ruleIds
    }, {arrayFormat: 'brackets'})
  })
}
