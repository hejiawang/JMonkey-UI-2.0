import CConfirmComponent from '@/plugins/confirmModal/component'

let $vm

export default {
  install (Vue, options) {
    if (!$vm) {
      const ConfirmModalPlugin = Vue.extend(CConfirmComponent)
      $vm = new ConfirmModalPlugin({ el: document.createElement('div') })
      document.body.appendChild($vm.$el)
    }

    let CConfirmPlugin = (options) => {
      if (options.content) $vm.content = options.content
      if (options.yesTitle) $vm.yesTitle = options.yesTitle
      if (options.noTitle) $vm.noTitle = options.noTitle

      $vm.isShow = true
      $vm.yesHandle = () => {
        $vm.isShow = false
        if (options.yesConfirm) options.yesConfirm()
      }
      $vm.noHandle = () => {
        $vm.isShow = false
        if (options.noConfirm) options.noConfirm()
      }
    }

    if (!Vue.$CConfirm) Vue.$CConfirm = CConfirmPlugin
    Vue.prototype.$CConfirm = Vue.$CConfirm
  }
}
