/**
 * 删除操作确认框插件
 * 使用说明：
 *    参数：
 *        title： 删除框头部信息，默认“删除确认”，非必需参数
 *        content： 提示主体内容，默认“您将删除该条数据，是否继续？”，非必需参数
 *        confirm： 具体删除操作方法，必须
 *    例子：
        this.$CDelete({
          'title': '真的要删除吗???',
          'content': '<p>名称为 <span style="color: #f60">' + row.name + '</span> 的用户将被删除</p><p>是否继续？</p>',
          'confirm': () => {
            this.$Message.success('删除成功')
          }
        })
 * @Auther: HeJiawang
 * @Date: 2018/11/29
 */

import CDeleteComponent from '@/plugins/deleteModal/component'

let $vm

export default {
  /**
   * 删除操作确认框插件
   * @param Vue
   * @param options { title: '', content: '', confirm: ()=> {}  }
   */
  install (Vue, options) {
    if (!$vm) {
      const DeleteModalPlugin = Vue.extend(CDeleteComponent)
      $vm = new DeleteModalPlugin({ el: document.createElement('div') })
      document.body.appendChild($vm.$el)
    }

    let CDeletePlugin = (options) => {
      if (!options.confirm) {
        console.error('调用删除提示框插件失败，未提供confirm回调函数')
        return
      }

      if (options.title) $vm.title = options.title
      if (options.content) $vm.content = options.content

      $vm.isShow = true
      $vm.del = () => {
        $vm.isShow = false
        options.confirm()
      }
    }

    if (!Vue.$CDelete) Vue.$CDelete = CDeletePlugin
    Vue.prototype.$CDelete = Vue.$CDelete
  }
}
