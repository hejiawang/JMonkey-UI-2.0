import request from '@/utils/request'

/**
 * 系统，菜单，构成的树形结果数据
 */
export const smtree = () => {
  return request({
    url: '/sys/resource/smtree',
    method: 'get'
  })
}

/**
 * 系统，菜单，按钮，构成的树形结果数据
 */
export const smbtree = () => {
  return request({
    url: '/sys/resource/smbtree',
    method: 'get'
  })
}

/**
 * 根据sys_resource表的id获取资源名称
 * @param rId sys_resource表的id
 */
export const findNameByRid = (rId) => {
  return request({
    url: '/sys/resource/findNameByRid',
    method: 'get',
    params: {
      'rId': rId
    }
  })
}
