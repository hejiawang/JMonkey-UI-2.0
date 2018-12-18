import request from '@/utils/request'

/**
 * 获取树形表格数据
 */
export const tree = () => {
  return request({
    url: '/sys/dict/tree',
    method: 'get'
  })
}

/**
 * 保存字典信息
 * @param obj 字典信息
 */
export const save = (obj) => {
  return request({
    url: '/sys/dict/save',
    method: 'post',
    data: obj
  })
}

/**
 * 删除字典
 * @param id 字典id
 */
export const del = (id) => {
  return request({
    url: '/sys/dict/delete/' + id,
    method: 'delete'
  })
}

/**
 * 校验字典键值是否存在
 * @param id
 * @param value
 */
export const checkValue = (id, value) => {
  return request({
    url: '/sys/dict/checkValue',
    data: {
      id: id,
      value: value
    },
    method: 'post'
  })
}
