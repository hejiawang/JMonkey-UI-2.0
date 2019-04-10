<template>
  <Layout>
    <Spin size="large" fix v-if="loading" class="app-layout-spin"/>

    <CHeader />
    <Layout>
      <Sider hide-trigger class="app-layout-sider">
        <CMenu />
      </Sider>
      <Layout>
        <CPilot />
        <Content>
          <router-view />
        </Content>
        <CFooter />
      </Layout>
    </Layout>
  </Layout>
</template>
<script>
import store from '@/store'
import CHeader from '@/components/layout/header'
import CFooter from '@/components/layout/footer'
import CMenu from '@/components/layout/menu'
import CPilot from '@/components/layout/pilot'
import { rebuildRouter } from '@/utils/router'
import { onEvent } from '@/utils/common'

export default {
  name: 'LayoutMain',
  components: {
    CHeader, CFooter, CMenu, CPilot
  },
  created () {
    this.initSystem()
    this.initRouter()
    this.initIndex()
    this.setWindowHeight()
  },
  mounted () {
    /**
     * 当窗口大小变化时更新store中的窗口高度
     */
    onEvent(window, 'resize', this.setWindowHeight)
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    /**
     * 将当前窗口高度保存至store
     */
    setWindowHeight () {
      store.commit('SET_WINDOWHEIGHT', document.body.clientHeight)
    },
    /**
     * 显示home中的页面
     */
    initIndex () {
      if (store.getters.currentMenu !== '/') {
        this.$router.replace(store.getters.currentMenu)

        // 处理登录后直接到全屏页时效果问题
        let sHome = null
        store.getters.menuList.forEach(menu => {
          if (menu.isIndex === 'Yes') sHome = menu
        })

        if (sHome && sHome.showType !== 'Screen') this.loading = false
      }
    },
    initRouter () {
      rebuildRouter()
    },
    /**
     * 没有引导页时设置第0个有权限的系统为当前系统
     */
    initSystem () {
      if (this.$CV.isEmpty(store.getters.currentSystem)) {
        let systemInfo = this.getFirstSystem()
        store.dispatch('renderSystem', systemInfo).then(() => {
          store.commit('SET_CURRENTMENU', store.getters.currentSystemHome)

          this.initIndex()
        })
      }
    },
    /**
     * 获取第一个有权限的菜单
     * @returns {*}
     */
    getFirstSystem () {
      let systemInfo = null
      for (var i = 0; i < store.getters.systemList.length; i++) {
        let s = store.getters.systemList[i]
        if (s.isAuth === 'Yes') {
          systemInfo = s
          break
        }
      }

      return systemInfo
    }
  }
}
</script>
<style lang="scss">
  .app-layout-spin {
    z-index: 99999;
    background-color: rgba(255,255,255, 1);
  }
</style>
