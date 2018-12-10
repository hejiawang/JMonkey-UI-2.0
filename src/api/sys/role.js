import request from '@/utils/request'

/**
 * 角色分页列表
 * @param query 查询条件
 */
export const list = (query) => {
  return request({
    url: '/sys/role/list',
    method: 'get',
    params: query
  })
}
