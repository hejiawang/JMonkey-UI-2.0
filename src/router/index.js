import Vue from 'vue'
import Router from 'vue-router'
import LayoutMain from '@/views/layout'
import LayoutGuide from '@/views/layout/guide'
import DefaultHome from '@/views/home'
import SysUser from '@/views/sys/user'
import SysRole from '@/views/sys/role'
import SysDept from '@/views/sys/dept'
import SysButton from '@/views/sys/button'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '系统主页',
      component: LayoutMain,
      children: [
        { path: '/home', name: '默认首页', component: DefaultHome },
        { path: '/sys/user', name: '用户管理', component: SysUser },
        { path: '/sys/role', name: '用户管理', component: SysRole },
        { path: '/sys/dept', name: '用户管理', component: SysDept },
        { path: '/sys/button', name: '用户管理', component: SysButton }
      ]
    },
    {
      path: '/guide',
      name: '引导页',
      component: LayoutGuide
    }
  ]
})
