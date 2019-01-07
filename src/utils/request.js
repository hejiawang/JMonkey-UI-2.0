import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'iview'
import errorCode from '@/const/errorCode'

NProgress.configure({ showSpinner: false })

axios.defaults.timeout = 50000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/**
 * axios 请求拦截
 */
axios.interceptors.request.use(config => {
  NProgress.start()
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * axios 数据返回拦截
 */
axios.interceptors.response.use(data => {
  NProgress.done()
  return data.data
}, error => {
  NProgress.done()

  let errMsg = error.toString()
  console.error('jmonkey request error:' + errMsg)
  let code = errMsg.substr(errMsg.indexOf('code') + 5)
  Message.error(errorCode[code] || errorCode['default'])

  return Promise.reject(new Error(error))
})

export default axios
