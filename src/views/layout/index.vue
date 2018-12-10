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

export default {
  name: 'LayoutMain',
  components: {
    CHeader, CFooter, CMenu, CPilot
  },
  created () {
  },
  data () {
    return {
    }
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
  }
}
</script>
