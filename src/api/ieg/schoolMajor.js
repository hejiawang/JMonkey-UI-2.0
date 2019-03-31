import request from '@/utils/request'

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
