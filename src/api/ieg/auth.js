import request from '@/utils/request'
import qs from 'qs'

/**
 * 获取用户授权信息
 * @param userId
 */
export const findShcoolIdByUser = (userId) => {
  return request({
    url: '/ieg/auth/findShcoolIdByUser/' + userId,
    method: 'get'
  })
}

/**
 * 为用户授权
 * @param userId
 * @param schoolIds
 */
export const auth = (userId, schoolIds) => {
  return request({
    url: '/ieg/auth/auth',
    method: 'post',
    data: qs.stringify({
      userId: userId,
      schoolIds: schoolIds
    }, {arrayFormat: 'brackets'})
  })
}
