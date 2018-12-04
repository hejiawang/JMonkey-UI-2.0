import { validatenull } from '@/utils/validate'

/**
 * 存储localStorage
 * @param params
 */
export const setStore = (params) => {
  const { name, content, type } = params

  const obj = {
    dataType: typeof (content),
    content: content,
    type: type,
    datetime: new Date().getTime()
  }

  if (type) window.sessionStorage.setItem(name, JSON.stringify(obj))
  else window.localStorage.setItem(name, JSON.stringify(obj))
}

/**
 * 获取localStorage
 * @param params
 * @returns {*}
 */
export const getStore = (params) => {
  const { name } = params

  let obj = window.localStorage.getItem(name)
  if (validatenull(obj)) obj = window.sessionStorage.getItem(name)
  if (validatenull(obj)) return

  obj = JSON.parse(obj)
  let content
  if (obj.dataType === 'string') {
    content = obj.content
  } else if (obj.dataType === 'number') {
    content = Number(obj.content)
  } else if (obj.dataType === 'boolean') {
    content = eval(obj.content) // eslint-disable-line
  } else if (obj.dataType === 'object') {
    content = obj.content
  }
  return content
}

/**
 * 删除localStorage
 * @param params
 */
export const removeStore = params => {
  let { name } = params

  window.localStorage.removeItem(name)
  window.sessionStorage.removeItem(name)
}
