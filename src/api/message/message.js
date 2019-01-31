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

export const readList = (query) => {
  return request({
    url: '/ms/message/readList',
    method: 'get',
    params: query
  })
}

/**
 * 保存消息
 * @param obj 消息
 */
export const save = (obj) => {
  return request({
    url: '/ms/message/save',
    method: 'post',
    data: obj
  })
}

/**
 * 删除消息
 * @param id 消息id
 */
export const del = (id) => {
  return request({
    url: '/ms/message/delete/' + id,
    method: 'delete'
  })
}

/**
 * 获取消息详情
 * @param id 消息id
 */
export const find = (id) => {
  return request({
    url: '/ms/message/find/' + id,
    method: 'get'
  })
}
