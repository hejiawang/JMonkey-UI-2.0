<template>
  <Layout v-layoutIn class="guide">
    <CHeader :system="false" />
    <Layout class="content">
      <Row :gutter="120">
        <Col span="8" class="content-col" v-for="system in systemList" :key="system.id">
          <!-- 有子菜单的显示方式 -->
          <Card v-if="system.menuList && system.menuList.length > 0">
            <div class="content-left">
              <div class="content-sys">
                <a @click="goIndex(system.rid, system.isAuth, '/home')">
                  <span :style="system.isAuth | authSpanFilter"> {{system.name}} </span>
                </a>
              </div>
            </div>
            <div class="content-right">
              <div class="content-menu">
                <Row :gutter="40">
                  <!-- 遍历系统菜单 -->
                  <Col span="12" v-for="menu in system.menuList" :key="menu.id">
                    <a @click="goIndex(system.rid, system.isAuth, menu.path)">
                      <div class="content-menu-detail">
                        <Row><Icon :type="menu.icon" size="50" :color="menu.isAuth | authIconFilter" /></Row>
                        <Row><span :style="menu.isAuth | authSpanFilter">{{menu.name}}</span></Row>
                      </div>
                    </a>
                  </Col>
                </Row>
              </div>
            </div>
          </Card>

          <!-- 无子菜单的显示方式 -->
          <Card v-else>
            <div class="content-only">
              <a @click="goIndex(system.rid, system.isAuth, '/home')">
                <Row><Icon :type="system.icon" size="100" :color="system.isAuth | authIconFilter"/></Row>
                <Row><span :style="system.isAuth | authSpanFilter">{{system.name}}</span></Row>
              </a>
            </div>
          </Card>
        </Col>
      </Row>
    </Layout>
  </Layout>
</template>
<script>
import store from '@/store'
import CHeader from '@/components/layout/header'

export default {
  name: 'LayoutGuide',
  components: {
    CHeader
  },
  computed: {
    /**
     * 登陆用户系统配置信息
     */
    systemList () {
      return store.getters.systemList
    }
  },
  filters: {
    authIconFilter (val) {
      const valMap = { No: '#808695', Yes: '#ff9900' }
      return valMap[val]
    },
    authSpanFilter (val) {
      const valMap = { No: 'color: #808695', Yes: 'color: #ff9900' }
      return valMap[val]
    }
  },
  created () {
    this.initRouter()
  },
  methods: {
    /**
     * 处理页面跳转路径问题
     */
    initRouter () {
      // 如果不需要引导页，回到首页
      if (!store.getters.isGuide) this.$router.push({path: '/'})
    },
    /**
     * 进入index页面
     * @param systemId 系统资源id resource id
     * @param isAuth 是否已授权
     * @param path index页面路径
     */
    goIndex (systemRId, isAuth, path) {
      if (isAuth === 'Yes') {
        store.commit('SET_CURRENTSYSTEM', systemRId)
        store.commit('SET_CURRENTMENU', path)

        this.$router.push({path: path})
      }
    }
  }
}
</script>
<style lang="scss">
  @import '../../assets/css/guide.scss';
</style>
