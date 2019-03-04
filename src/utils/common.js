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
 * // TODO obj参数 有待商榷,传递的参数太多了
 * 在iview中有些组件显示的key必须按照iview制定名称命名，
 * 该方法将指定的old key 赋值到新的 novel key上
 * 如果数据有子节点，按照指定的子节点childrenKey key遍历修改子节点信息
 * @param data 将要转换的数据
 * @param old 后台返回的key
 * @param novel 将要转换适应iview的key
 * @param childrenKey 子节点key
 * @param obj [{key: 'expand', value: true}]
 * @returns {*} 转换后的数据（原来的数据也变化了）
 */
export const converKey = (data, old = 'name', novel = 'title', childrenKey = 'children', obj = []) => {
  Array.from(data).forEach(tData => {
    Vue.set(tData, novel, tData[old])
    obj.forEach(o => { Vue.set(tData, o.key, o.value) })

    // 过滤子节点key
    if (tData[childrenKey] && tData[childrenKey].length > 0) converKey(tData.children, old, novel, childrenKey, obj)
  })

  return data
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const onEvent = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const offEvent = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * 生成随机len位数字
 * @param len
 * @param date
 * @returns {string}
 */
export const randomLenNum = (len, date) => {
  let random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, typeof len === 'number' ? len : 4)
  if (date) random = random + Date.now()
  return random
}
