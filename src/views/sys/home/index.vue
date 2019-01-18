<template>
  <Layout v-layoutIn class="app-sys-home">
    <CBaseCount />
    <CUserCount />
    <CDeptTree />
  </Layout>
</template>
<script>
import CBaseCount from '@/views/sys/home/baseCount'
import CUserCount from '@/views/sys/home/userCount'
import CDeptTree from '@/views/sys/dept/deptTree'

export default {
  name: 'SysDefaultHome',
  components: {
    CBaseCount, CUserCount, CDeptTree
  }
}
</script>
<style lang="scss">
  .app-sys-home{
    overflow-y: auto;
  }
</style>
