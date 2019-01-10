<template>
  <Header>
    <div class="cheader-images" style="float: left">
      <img src="../../../assets/images/layout/danghui.png">
      <img src="../../../assets/images/layout/guohui.png">
    </div>
    <div class="cheader-info">
      <span>欢迎登录JMonkey管理系统2.0版本</span>
    </div>
    <CHeaderUser :system="system"/>

    <template v-if="system && isGuide">
      <div class="cheader-system">
        <a href="#">
          <Row class="cheader-system-title">
            <Icon type="ios-baseball" size="30" />
          </Row>
          <Row class="cheader-system-content">
            <span>足球系统</span>
          </Row>
        </a>
      </div>
      <div class="cheader-system-current">
        <a href="#">
          <Row class="cheader-system-title">
            <Icon type="md-beer" size="30"/>
          </Row>
          <Row class="cheader-system-content">
            <span>当前系统</span>
          </Row>
        </a>
      </div>
      <div class="cheader-system">
        <a href="#">
          <Row class="cheader-system-title">
            <Icon type="ios-body" size="30"/>
          </Row>
          <Row class="cheader-system-content">
            <span>人员系统</span>
          </Row>
        </a>
      </div>

      <div class="cheader-back">
        <a href="#" @click="goGuide">
          <Row class="cheader-back-title">
            <Icon type="ios-undo" size="40" color="#2b85e4"/>
          </Row>
          <Row class="cheader-back-content">
            <span>返回上级</span>
          </Row>
        </a>
      </div>
    </template>

  </Header>
</template>
<script>
import store from '@/store'
import CHeaderUser from '@/components/layout/header/userInfo'

export default {
  name: 'CHeader',
  components: {
    CHeaderUser
  },
  props: {
    system: {type: Boolean, default: true, required: false}
  },
  computed: {
    /**
     * 是否在头部显示系统列表
     * @returns {getters.isGuide} true显示
     */
    isGuide () { return store.getters.isGuide }
  },
  data () {
    return {
    }
  },
  methods: {
    goGuide () {
      this.$router.push('/guide')
    }
  }
}
</script>
