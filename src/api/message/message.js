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

/**
 * 读取消息列表
 * @param query
 */
export const readList = (query) => {
  return request({
    url: '/ms/message/readList',
    method: 'get',
    params: query
  })
}

/**
 * 审核消息列表
 * @param query
 */
export const auditList = (query) => {
  return request({
    url: '/ms/message/auditList',
    method: 'get',
    params: query
  })
}

/**
 * 审核消息
 * @param state true 通过 false 拒绝
 * @param taskId 任务id
 */
export const audit = (state, taskId, messageId) => {
  return request({
    url: '/ms/message/audit',
    method: 'get',
    params: {
      state: state,
      taskId: taskId,
      messageId: messageId
    }
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
 * 重新发布消息信息
 * @param obj 消息细腻些
 */
export const modify = (obj) => {
  return request({
    url: '/ms/message/modify',
    method: 'put',
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
