<template>
  <div>
    <Input type="text" v-model.trim="resource.name" readonly @on-focus="showResource"/>
    <Modal v-model="isShow" title="选择上级资源" footer-hide @on-visible-change="visibleChange">
      <Tree :data="resourceTreeList" :render="renderTreeContent" />
    </Modal>
  </div>
</template>
<script>
import { smtree } from '@/api/sys/resource'

export default {
  name: 'SysResocrce_smTree',
  data () {
    return {
      resource: {id: '', name: ''},
      isShow: false,
      resourceTreeList: []
    }
  },
  methods: {
    showResource () {
      this.isShow = true
    },
    visibleChange (isOpen) {
      if (isOpen) {
        smtree().then(data => {
          this.resourceTreeList = data.result
        })
      }
    },
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
    selectResource (data) {
      this.resource = {
        id: data.id,
        name: data.name
      }

      this.isShow = false
    }

  }
}
</script>
