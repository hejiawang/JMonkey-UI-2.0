<template>
  <Drawer :title="drawerTitle" width="400" v-model="isShow" @on-visible-change="showDrawer" class="app-sys-role-auth">
    <Row class="body">
      <!-- 实现树中父子节点不关联的效果 -->
      <CheckboxGroup v-model="roleAuths">
        <Tree :data="resourceTreeList" :render="renderTreeContent"/>
      </CheckboxGroup>
    </Row>
    <Row class="bottom">
      <Button type="success" long @click="handleAuth"> 授&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;权 </Button>
    </Row>
  </Drawer>
</template>
<script>
import { smbtree } from '@/api/sys/resource'
import { findRidByRole, auth } from '@/api/sys/roleResource'

export default {
  name: 'SysRole_Authorize',
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  props: {
    value: {type: Boolean, default: false, required: true},
    role: { required: true }
  },
  computed: {
    /**
     * 抽屉头部tile
     */
    drawerTitle () {
      let t = this.$CV.isEmpty(this.role) ? '' : this.role.name
      return '授权角色：' + t
    }
  },
  data () {
    return {
      isShow: false,
      resourceTreeList: [],
      roleAuths: [],
      iconType: { System: 'md-apps', Menu: 'ios-menu', Button: 'md-radio-button-off' }
    }
  },
  created () {
    this.initRTree()
  },
  methods: {
    /**
     * 渲染资源树
     */
    renderTreeContent (h, { root, node, data }) {
      return h('span',
        {
          class: 'ivu-tree-title',
          on: {click: (e) => { this.selectAuth(data.id) }}
        },
        [
          h('Checkbox', {
            props: { label: data.id },
            style: { marginRight: '8px' }
          }, ''),
          h('Icon', {
            props: { type: this.iconType[data.type] },
            style: { marginRight: '8px' }
          }),
          h('span', data.name)
        ]
      )
    },
    /**
     * 选择授权的权限
     * @param rId 资源id
     */
    selectAuth (rId) {
      if (this.roleAuths.indexOf(rId) < 0) this.roleAuths.push(rId)
      else this.roleAuths.splice(this.roleAuths.indexOf(rId), 1)
    },
    /**
     * 初始化资源树
     */
    initRTree () {
      smbtree().then(data => { this.resourceTreeList = data.result })
    },
    /**
     * 初始化资源树信息
     * @param isOpen
     */
    showDrawer (isOpen) {
      if (isOpen) {
        // 重置角色授权信息
        this.roleAuths = []
        findRidByRole(this.role.id).then(data => { this.roleAuths = data.result })
      }
    },
    /**
     * 为角色授权
     */
    handleAuth () {
      auth(this.role.id, this.roleAuths).then(data => {
        if (data.isSuccess) {
          this.$Message.success('授权成功')
          this.isShow = false
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .app-sys-role-auth{
    .body{
      height: calc(100% - 60px);
      overflow-y: auto;
    }
    .bottom{
      position: absolute;
      width: calc(100% - 20px);
      height: 60px;
      border-top: 1px solid #e8e8e8;
      padding: 10px;
      bottom: 0px;
    }
  }
</style>
