import layoutIn from './animatedFadeIn'

const install = function (Vue) {
  Vue.directive('layoutIn', layoutIn)
}

if (window.Vue) {
  window.layoutIn = layoutIn
  Vue.use(install) // eslint-disable-line
}

layoutIn.install = install
export default layoutIn
