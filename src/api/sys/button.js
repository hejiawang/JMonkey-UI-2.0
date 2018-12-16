import request from '@/utils/request'

/**
 * 获取菜单下的按钮信息list
 * @param parentId
 */
export const list = (parentId) => {
  return request({
    url: '/sys/button/list',
    method: 'get',
    params: {
      'parentId': parentId
    }
  })
}

/**
 * 保存按钮信息
 * @param obj 按钮信息
 */
export const save = (obj) => {
  return request({
    url: '/sys/button/save',
    method: 'post',
    data: obj
  })
}

/**
 * 删除按钮信息
 * @param id 按钮信息id
 */
export const del = (id) => {
  return request({
    url: '/sys/button/delete/' + id,
    method: 'delete'
  })
}

/**
 * 修改按钮信息
 * @param obj 按钮信息
 */
export const modify = (obj) => {
  return request({
    url: '/sys/button/modify',
    method: 'put',
    data: obj
  })
}
