import request from '@/utils/request'

/**
 * 保存院校信息
 * @param obj 院校信息
 */
export const save = (obj) => {
  return request({
    url: '/ieg/school/save',
    method: 'post',
    data: obj
  })
}

/**
 * 修改院校信息
 * @param obj 院校信息
 */
export const modify = (obj) => {
  return request({
    url: '/ieg/school/modify',
    method: 'put',
    data: obj
  })
}

/**
 * 删除院校信息
 * @param id 院校信息id
 */
export const del = (id) => {
  return request({
    url: '/ieg/school/delete/' + id,
    method: 'delete'
  })
}
