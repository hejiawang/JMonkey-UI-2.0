<template>
  <Header>
    <div class="cheader-images" style="float: left">
      <img src="../../../assets/images/layout/danghui.png">
      <img src="../../../assets/images/layout/guohui.png">
    </div>
    <div class="cheader-info">
      <span>欢迎登录JMonkey管理系统2.0版本</span>
    </div>

    <CHeaderUser :system="system" />

    <CHeaderSystem :system="system" />
  </Header>
</template>
<script>
import CHeaderUser from '@/components/layout/header/userInfo'
import CHeaderSystem from '@/components/layout/header/systemInfo'

export default {
  name: 'CHeader',
  components: {
    CHeaderUser, CHeaderSystem
  },
  props: {
    system: {type: Boolean, default: true, required: false}
  }
}
</script>
