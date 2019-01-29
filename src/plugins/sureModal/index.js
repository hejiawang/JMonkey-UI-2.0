import CSureComponent from '@/plugins/sureModal/component'

let $vm

export default {
  install (Vue, options) {
    if (!$vm) {
      const SureModalPlugin = Vue.extend(CSureComponent)
      $vm = new SureModalPlugin({ el: document.createElement('div') })
      document.body.appendChild($vm.$el)
    }

    let CSurePlugin = (options) => {
      if (!options.confirm) {
        console.error('调用信息提示框插件失败，未提供confirm回调函数')
        return
      }

      if (options.content) $vm.content = options.content

      $vm.isShow = true
      $vm.handle = () => {
        $vm.isShow = false
        options.confirm()
      }
    }

    if (!Vue.$CSure) Vue.$CSure = CSurePlugin
    Vue.prototype.$CSure = Vue.$CSure
  }
}
