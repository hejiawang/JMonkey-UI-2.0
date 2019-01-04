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
 * 修改字典信息
 * @param obj 字典信息
 */
export const modify = (obj) => {
  return request({
    url: '/sys/dict/modify',
    method: 'put',
    data: obj
  })
}

/**
 * 获取字典信息
 * @param id 字典id
 */
export const find = (id) => {
  return request({
    url: '/sys/dict/find/' + id,
    method: 'get'
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

/**
 * 为字典组件赋值
 * 根据父value获取子字典信息
 * @param parentValue 父字典value
 */
export const findChildren = (parentValue) => {
  return request({
    url: '/sys/dict/findChildren/' + parentValue,
    method: 'get'
  })
}
