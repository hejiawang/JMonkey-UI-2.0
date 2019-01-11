<template>
  <CBreadcrumb v-if="showType == 'Breadcrumb'" />
  <CTabs v-else/>
</template>
<script>
import CBreadcrumb from '@/components/layout/pilot/breadcrumb'
import CTabs from '@/components/layout/pilot/tabs'
import store from '@/store'

/**
 * 系统展示方式：导航条或者标签页
 */
export default {
  name: 'CPilot',
  components: {
    CBreadcrumb, CTabs
  },
  computed: {
    /**
     * 系统显示方式
     * @returns {default.computed.showType|(function())|string} Tabs标签页方式 Breadcrumb导航条方式
     */
    showType () { return store.getters.currentSystem.showType }
  }
}
</script>
