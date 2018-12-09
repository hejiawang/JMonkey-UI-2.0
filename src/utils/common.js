import Vue from 'vue'

/**
 * 将树形结构转换为array, 构建支持树形table的数据
 * @param data 树形结构对象
 * @param expandAll 是否展开
 * @param show 父结构对象
 * @param level 等级
 */
export const treeToArray = (data, expandAll, show = true, level = null) => {
  let treeArray = []
  Array.from(data).forEach(record => {
    Vue.set(record, '_expanded', expandAll) // 设置节点是否展开
    if (record._show === undefined || record._show == null) Vue.set(record, '_show', show) // 设置节点是否显示

    let _level = 1
    if (level !== undefined && level !== null) _level = level + 1
    Vue.set(record, '_level', _level) // 设置节点层级

    treeArray.push(record)

    if (record.children && record.children.length > 0) { // 递归子节点
      const children = treeToArray(record.children, expandAll, false, _level)
      treeArray = treeArray.concat(children)
    }
  })

  return treeArray
}
