import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import LayoutMain from '@/views/layout'
import LayoutGuide from '@/views/layout/guide'
import SysHome from '@/views/sys/home'
import SysUser from '@/views/sys/user'
import SysRole from '@/views/sys/role'
import SysDept from '@/views/sys/dept'
import SysDict from '@/views/sys/dict'
import SysButton from '@/views/sys/button'
import SysMenu from '@/views/sys/menu'
import SysSystem from '@/views/sys/system'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登陆页',
      component: Login
    },
    {
      path: '/',
      name: '系统主页',
      component: LayoutMain,
      children: [
        { path: '/home', name: '系统首页', component: SysHome },
        { path: '/sys/user', name: '用户管理', component: SysUser },
        { path: '/sys/role', name: '角色管理', component: SysRole },
        { path: '/sys/dept', name: '部门管理', component: SysDept },
        { path: '/sys/dict', name: '字典管理', component: SysDict },
        { path: '/sys/system', name: '系统管理', component: SysSystem },
        { path: '/sys/menu', name: '菜单管理', component: SysMenu },
        { path: '/sys/button', name: '按钮管理', component: SysButton }
      ]
    },
    {
      path: '/guide',
      name: '引导页',
      component: LayoutGuide
    }
  ]
})
