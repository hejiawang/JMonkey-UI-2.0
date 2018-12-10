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
