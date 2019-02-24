import request from '@/utils/request'

/**
 * 分页查询
 * @param query query
 */
export const pageList = (query) => {
  return request({
    url: '/ms/chat/group/pageList',
    method: 'get',
    params: query
  })
}

/**
 * 获取当前登录人所在的群组list
 */
export const list = () => {
  return request({
    url: '/ms/chat/group/list',
    method: 'get'
  })
}

/**
 * 新建群组
 * @param obj 群组信息
 */
export const save = (obj) => {
  return request({
    url: '/ms/chat/group/save',
    method: 'post',
    data: obj
  })
}

/**
 * 修改群组信息
 * @param obj 群组信息
 */
export const modify = (obj) => {
  return request({
    url: '/ms/chat/group/modify',
    method: 'put',
    data: obj
  })
}

/**
 * 删除群组
 * @param id 群组id
 */
export const del = (id) => {
  return request({
    url: '/ms/chat/group/delete/' + id,
    method: 'delete'
  })
}

/**
 * 获取群组信息
 * @param id 群组id
 */
export const find = (id) => {
  return request({
    url: '/ms/chat/group/find/' + id,
    method: 'get'
  })
}
