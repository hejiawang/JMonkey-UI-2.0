/**
 * 校验插件
 * @Auther: HeJiawang
 * @Date: 2018/11/29
 */
export default {
  install (Vue, options) {
    Vue.prototype.$CV = {
      /**
       * 判断是否为空 为空返回true
       * @param val
       * @returns {boolean}
       */
      isEmpty: (val) => {
        if (val instanceof Array) {
          if (val.length === 0) return true
        } else if (val instanceof Object) {
          if (JSON.stringify(val) === '{}') return true
        } else {
          if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true
          return false
        }
        return false
      },
      /**
       * 判断是否为正确的11位手机号码
       * @param str
       * @returns {boolean}
       */
      isPhone: (str) => {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        return reg.test(str)
      }
    }
  }
}
