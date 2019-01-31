import request from '@/utils/request'

/**
 * 统计未读消息状态
 */
export const count = () => {
  return request({
    url: '/ms/read/count',
    method: 'get'
  })
}

/**
 * 将消息置为已读状态
 * @param messageId
 */
export const read = (messageId) => {
  return request({
    url: '/ms/read/read',
    method: 'get',
    params: {
      messageId: messageId
    }
  })
}
