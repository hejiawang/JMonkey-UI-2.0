<template>
  <Breadcrumb>
    <BreadcrumbItem><Icon type="md-pin" size="20" color="#19be6b"/></BreadcrumbItem>

    <BreadcrumbItem v-for="item in breadcrumbList" :key="item">{{item}}</BreadcrumbItem>
  </Breadcrumb>
</template>
<script>
import store from '@/store'

export default {
  name: 'CBreadcrumb',
  computed: {
    /**
     * 当前菜单路径
     */
    currentMenu () { return store.getters.currentMenu },
    /**
     * 当前系统信息
     */
    currentSystem () { return store.getters.currentSystem },
    /**
     * 构建导航条信息
     * TODO 现在只支持两级菜单，应该递归获取
     * @returns {string[]}
     */
    breadcrumbList () {
      // 将系统名称作为第一级导航信息
      let breadcrumbList = [this.currentSystem.name]

      // 遍历当前所有菜单，拼接导航条信息
      let allAuthMenu = this.currentSystem.authMenuList
      allAuthMenu.forEach(menu => {
        // 选择的菜单为一级菜单
        if (menu.path === this.currentMenu) {
          breadcrumbList.push(menu.name)
        } else {
          // 选择的菜单为二级菜单
          if (menu.children && menu.children.length > 0) {
            menu.children.forEach(cMenu => {
              if (cMenu.path === this.currentMenu) {
                breadcrumbList.push(menu.name)
                breadcrumbList.push(cMenu.name)
              }
            })
          }
        }
      })

      return breadcrumbList
    }
  }
}
</script>
