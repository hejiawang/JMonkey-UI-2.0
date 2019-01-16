import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import LayoutMain from '@/views/layout'
import LayoutGuide from '@/views/layout/guide'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: '系统主页', component: LayoutMain },
    { path: '/login', name: '登陆页', component: Login },
    { path: '/guide', name: '引导页', component: LayoutGuide }
  ]
})
