import request from '@/utils/request'

/**
 * 分页查询历史聊天记录
 * @param query
 */
export const list = (query) => {
  return request({
    url: '/ms/chat/history/list',
    method: 'get',
    params: query
  })
}
