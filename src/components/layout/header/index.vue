<template>
  <Header>
    <div class="cheader-images" style="float: left">
      <img src="../../../assets/images/layout/danghui.png">
      <img src="../../../assets/images/layout/guohui.png">
    </div>
    <div class="cheader-info">
      <span>{{website.title.header}}</span>
    </div>

    <CHeaderUser :system="system" />

    <CHeaderSystem :system="system" />
  </Header>
</template>
<script>
import CHeaderUser from '@/components/layout/header/userInfo'
import CHeaderSystem from '@/components/layout/header/systemInfo'
import { mapGetters } from 'vuex'

export default {
  name: 'CHeader',
  computed: {
    ...mapGetters(['website'])
  },
  components: {
    CHeaderUser, CHeaderSystem
  },
  props: {
    system: {type: Boolean, default: true, required: false}
  }
}
</script>
