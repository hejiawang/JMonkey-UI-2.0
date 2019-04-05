import request from '@/utils/request'

/**
 * 导入信息
 * @param obj
 */
export const importInfo = (obj) => {
  return request({
    url: '/ieg/enroll/info/importInfo',
    method: 'post',
    data: obj
  })
}

/**
 * list
 * @param query
 */
export const list = (query) => {
  return request({
    url: '/ieg/enroll/info/list',
    method: 'get',
    params: query
  })
}

/**
 * 清空投档分数线信息
 * @param enrollId enrollId
 */
export const delByEnroll = (enrollId) => {
  return request({
    url: '/ieg/enroll/info/delByEnroll/' + enrollId,
    method: 'delete'
  })
}
