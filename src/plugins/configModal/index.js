import CConfigComponent from '@/plugins/configModal/component'

let $vm

export default {
  install (Vue, options) {
    if (!$vm) {
      const ConfigModalPlugin = Vue.extend(CConfigComponent)
      $vm = new ConfigModalPlugin({ el: document.createElement('div') })
      document.body.appendChild($vm.$el)
    }

    let CConfigPlugin = (options) => {
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

    if (!Vue.$CConfig) Vue.$CConfig = CConfigPlugin
    Vue.prototype.$CConfig = Vue.$CConfig
  }
}
