import request from '@/utils/request'
import qs from 'qs'

export const findShcoolIdByUser = (userId) => {
  return request({
    url: '/ieg/auth/findShcoolIdByUser/' + userId,
    method: 'get'
  })
}

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
