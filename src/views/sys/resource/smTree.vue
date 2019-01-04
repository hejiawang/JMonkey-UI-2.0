<template>
  <div>
    <Input type="text" v-model.trim="resourceName" readonly @on-focus="showResource"/>
    <Modal v-model="isShow" title="选择上级资源" footer-hide @on-visible-change="visibleChange">
      <Tree :data="resourceTreeList" :render="renderTreeContent" />
    </Modal>
  </div>
</template>
<script>
import { smtree, findNameByRid } from '@/api/sys/resource'

/**
 * 系统、菜单 两级资源
 */
export default {
  name: 'SysResocrce_smTree',
  props: {
    value: {required: true}
  },
  watch: {
    /**
     * id改变时，修改上级资源显示的名称
     * @param val
     */
    value (val) {
      this.resourceId = val
      findNameByRid(val).then(data => { this.resourceName = data.result })
    },
    resourceId (val) { this.$emit('input', val) }
  },
  mounted () {
    // 初始值赋值
    this.resourceId = this.value
    findNameByRid(this.value).then(data => { this.resourceName = data.result })
  },
  data () {
    return {
      resourceId: null,
      resourceName: null,
      isShow: false,
      resourceTreeList: []
    }
  },
  methods: {
    /**
     * 显示上级资源的modal
     */
    showResource () {
      this.isShow = true
    },
    /**
     * 当modal打开时，重新为上级资源树赋值
     */
    visibleChange (isOpen) {
      if (isOpen) smtree().then(data => { this.resourceTreeList = data.result })
    },
    /**
     * 渲染树
     */
    renderTreeContent (h, { root, node, data }) {
      let iconType = ''
      if (data.type === 'System') iconType = 'md-apps'
      else if (data.type === 'Menu') iconType = 'ios-menu'

      return h('span',
        {
          class: ['ivu-tree-title'],
          on: { click: () => { this.selectResource(data) } }
        },
        [
          h('Icon', {
            props: { type: iconType },
            style: { marginRight: '8px' }
          }),
          h('span', data.name)
        ]
      )
    },
    /**
     * 选择资源信息
     * @param data
     */
    selectResource (data) {
      this.resourceId = data.id
      this.isShow = false
    }
  }
}
</script>
