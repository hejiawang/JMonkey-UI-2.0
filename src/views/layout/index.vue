<template>
  <Layout>
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

export default {
  name: 'LayoutMain',
  components: {
    CHeader, CFooter, CMenu, CPilot
  },
  created () {
    this.initSystem()
    this.initRouter()
    this.initIndex()
  },
  mounted () {
    /**
     * 将当前窗口高度保存至store，并当窗口大小变化时更新store中的窗口高度
     */
    store.commit('SET_WINDOWHEIGHT', document.body.clientHeight)
    window.onresize = () => {
      return (() => {
        store.commit('SET_WINDOWHEIGHT', document.body.clientHeight)
      })()
    }
  },
  methods: {
    /**
     * 显示home中的页面
     */
    initIndex () {
      this.$router.replace(store.getters.currentMenu)
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
        if (s.isAuth) {
          systemInfo = s
          break
        }
      }

      return systemInfo
    }
  }
}
</script>
