import request from '@/utils/request'

/**
 * list
 * @param query
 */
export const list = (query) => {
  return request({
    url: '/ieg/grade/list',
    method: 'get',
    params: query
  })
}

/**
 * save
 * @param obj
 */
export const save = (obj) => {
  return request({
    url: '/ieg/grade/save',
    method: 'post',
    data: obj
  })
}

/**
 * modify
 * @param obj
 */
export const modify = (obj) => {
  return request({
    url: '/ieg/grade/modify',
    method: 'put',
    data: obj
  })
}

/**
 * delete
 * @param id
 */
export const del = (id) => {
  return request({
    url: '/ieg/grade/delete/' + id,
    method: 'delete'
  })
}

/**
 * 批量删除
 * @param query 删除条件
 */
export const delByYearAndType = (query) => {
  return request({
    url: '/ieg/grade/delByYearAndType',
    method: 'get',
    params: query
  })
}

/**
 * 批量导入
 * @param obj
 */
export const importGrade = (obj) => {
  return request({
    url: '/ieg/grade/importGrade',
    method: 'post',
    data: obj
  })
}

/**
 * 校验一分一段表是否正确
 * @param obj obj
 */
export const checkGrade = (obj) => {
  return request({
    url: '/ieg/grade/checkGrade',
    method: 'post',
    data: obj
  })
}

/**
 * 校验是否存在
 * @param obj obj
 */
export const checkExist = (obj) => {
  return request({
    url: '/ieg/grade/checkExist',
    method: 'post',
    data: obj
  })
}
