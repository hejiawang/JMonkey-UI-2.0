import request from '@/utils/request'

/**
 * 代码生成接口
 * @param obj
 */
export const generator = (obj) => {
  return request({
    url: '/sys/code/generator',
    method: 'post',
    data: obj
  })
}
