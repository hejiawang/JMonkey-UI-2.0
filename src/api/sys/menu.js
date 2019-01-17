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
 * 修改菜单信息
 * @param obj 菜单信息
 */
export const modify = (obj) => {
  return request({
    url: '/sys/menu/modify',
    method: 'put',
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

/**
 * 获取菜单信息
 * @param id 菜单id
 */
export const find = (id) => {
  return request({
    url: '/sys/menu/find/' + id,
    method: 'get'
  })
}

/**
 * 校验path是否重复
 * @param obj menu信息
 */
export const checkPath = (id, path) => {
  return request({
    url: '/sys/menu/checkPath',
    data: {
      id: id,
      path: path
    },
    method: 'post'
  })
}
