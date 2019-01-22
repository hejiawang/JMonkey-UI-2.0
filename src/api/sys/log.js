import request from '@/utils/request'

/**
 * 获取日志列表
 */
export const list = () => {
  return request({
    url: '/sys/log/list',
    method: 'get'
  })
}

/**
 * 清空日志信息
 */
export const del = () => {
  return request({
    url: '/sys/log/deleteAll',
    method: 'delete'
  })
}
