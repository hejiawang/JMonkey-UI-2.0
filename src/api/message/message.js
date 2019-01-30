import request from '@/utils/request'

/**
 * 所有消息分页列表
 * @param query
 */
export const list = (query) => {
  return request({
    url: '/ms/message/list',
    method: 'get',
    params: query
  })
}
