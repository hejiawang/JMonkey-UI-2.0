import request from '@/utils/request'

/**
 * 获取院校历年录取信息
 * @param query 录取信息
 */
export const list = (query) => {
  return request({
    url: '/ieg/school/enroll/record/list',
    method: 'get',
    params: query
  })
}

/**
 * 保存院校录取信息
 * @param obj 录取信息
 */
export const save = (obj) => {
  return request({
    url: '/ieg/school/enroll/record/save',
    method: 'post',
    data: obj
  })
}

/**
 * 修改院校录取信息
 * @param obj 录取信息
 */
export const modify = (obj) => {
  return request({
    url: '/ieg/school/enroll/record/modify',
    method: 'put',
    data: obj
  })
}

/**
 * 删除院校录取信息
 * @param id 录取信息id
 */
export const del = (id) => {
  return request({
    url: '/ieg/school/enroll/record/delete/' + id,
    method: 'delete'
  })
}
