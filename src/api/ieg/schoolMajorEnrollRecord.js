import request from '@/utils/request'

/**
 * list
 * @param query
 */
export const list = (query) => {
  return request({
    url: '/ieg/school/major/enroll/record/list',
    method: 'get',
    params: query
  })
}

/**
 * delete
 * @param id
 */
export const del = (id) => {
  return request({
    url: '/ieg/school/major/enroll/record/delete/' + id,
    method: 'delete'
  })
}

/**
 * 保存院校录取信息
 * @param obj 录取信息
 */
export const save = (obj) => {
  return request({
    url: '/ieg/school/major/enroll/record/save',
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
    url: '/ieg/school/major/enroll/record/modify',
    method: 'put',
    data: obj
  })
}
