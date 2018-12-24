import Vue from 'vue'

/**
 * 将树形结构转换为array, 构建支持树形table的数据
 * @param data 树形结构对象
 * @param expandAll 是否展开
 * @param show 父结构对象
 * @param level 等级
 */
export const treeToArray = (data, expandAll, show = true, level = null, indexArray = []) => {
  let treeArray = []

  Array.from(data).forEach((record, index) => {
    Vue.set(record, '_expanded', expandAll) // 设置节点是否展开
    if (record._show === undefined || record._show == null) Vue.set(record, '_show', show) // 设置节点是否显示

    let _level = 1
    if (level !== undefined && level !== null) _level = level + 1
    Vue.set(record, '_level', _level) // 设置节点层级

    indexArray = indexArray.slice(0, _level - 1)
    indexArray.push(index)
    Vue.set(record, '_indexArray', indexArray)

    treeArray.push(record)

    if (record.children && record.children.length > 0) { // 递归子节点
      const children = treeToArray(record.children, expandAll, false, _level, indexArray)
      treeArray = treeArray.concat(children)
    }
  })

  return treeArray
}

/**
 * 在iview中有些组件显示的key必须按照iview制定名称命名，
 * 该方法将指定的old key 赋值到新的 novel key上
 * 如果数据有子节点，按照指定的子节点childrenKey key遍历修改子节点信息
 * @param data 将要转换的数据
 * @param old 后台返回的key
 * @param novel 将要转换适应iview的key
 * @param childrenKey 子节点key
 * @returns {*} 转换后的数据（原来的数据也变化了）
 */
export const converKey = (data, old = 'name', novel = 'title', childrenKey = 'children') => {
  Array.from(data).forEach(tData => {
    Vue.set(tData, novel, tData[old])

    // 过滤子节点key
    if (tData[childrenKey] && tData[childrenKey].length > 0) converKey(tData.children, old, novel, childrenKey)
  })

  return data
}

/**
 * 将时间戳根据规则转换为时间字符串
 * @param timeData 时间戳
 * @param cFormat 转换规则， 默认‘{y}-{m}-{d} {h}:{i}:{s}’
 * @returns {string} 时间字符串
 */
export const parseTime = (timeData, cFormat = '{y}-{m}-{d} {h}:{i}:{s}') => {
  if (timeData === null || timeData === '' || timeData === 'undefined' || timeData === undefined) return ''

  let time = new Date(timeData)
  if ((time + '').length === 10) time = +time * 1000

  let date
  if (typeof time === 'object') date = time
  else date = new Date(parseInt(time))

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }

  const timeStr = cFormat.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) value = '0' + value
    return value || 0
  })

  return timeStr
}
