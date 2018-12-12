import request from '@/utils/request'

/**
 * 菜单树形表格数据
 * @param systemId 归属系统id
 */
export const treeList = (rId) => {
  return request({
    url: '/sys/menu/treeList',
    method: 'get',
    params: {
      'rId': rId
    }
  })
}

/**
 * 保存菜单信息
 * @param obj 菜单信息
 */
export const save = (obj) => {
  return request({
    url: '/sys/menu/save',
    method: 'post',
    data: obj
  })
}

/**
 * 删除菜单信息
 * @param id 菜单信息id
 */
export const del = (id) => {
  return request({
    url: '/sys/menu/delete/' + id,
    method: 'delete'
  })
}
