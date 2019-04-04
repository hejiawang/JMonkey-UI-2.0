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
