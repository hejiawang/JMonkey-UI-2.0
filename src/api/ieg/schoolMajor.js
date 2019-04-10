import request from '@/utils/request'

/**
 * 获取院校专业信息
 * @param query query
 */
export const list = (query) => {
  return request({
    url: '/ieg/school/major/list',
    method: 'get',
    params: query
  })
}

/**
 * 保存院校专业信息
 * @param obj 专业信息
 */
export const save = (obj) => {
  return request({
    url: '/ieg/school/major/save',
    method: 'post',
    data: obj
  })
}

/**
 * 修改院校专业信息
 * @param obj 专业信息
 */
export const modify = (obj) => {
  return request({
    url: '/ieg/school/major/modify',
    method: 'put',
    data: obj
  })
}

/**
 * 删除院校专业信息
 * @param id 院校专业id
 */
export const del = (id) => {
  return request({
    url: '/ieg/school/major/delete/' + id,
    method: 'delete'
  })
}
