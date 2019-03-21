<template>
  <Drawer :title="drawerTitle" width="400" v-model="isShow" @on-visible-change="showDrawer" class="app-sys-role-data">
    <Row class="body">
      <Collapse simple>
        <Panel v-for="dataScope in dataScopeList" :key="dataScope.id" :name="dataScope.id">
          {{dataScope.name}}
          <p slot="content">
            <RadioGroup v-model="selectRule[dataScope.id]" vertical>
              <Radio v-for="rule in dataScope.ruleList" :key="rule.id" :label="rule.id"> <span>{{rule.name}}</span> </Radio>
            </RadioGroup>
          </p>
        </Panel>
      </Collapse>
    </Row>
    <Row class="bottom">
      <Button type="primary" long @click="handleAuth"> 确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定 </Button>
    </Row>
  </Drawer>
</template>
<script>
import { listDto } from '@/api/sys/dataScope'
import { auth, findByRole } from '@/api/sys/roleData'

export default {
  name: 'SysRole_Data',
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
      dataScopeList: [],
      selectRule: {}
    }
  },
  created () {
    this.initDataScope()
  },
  methods: {
    /**
     * inti dataScopeList
     */
    initDataScope () {
      listDto().then(data => { this.dataScopeList = data.result })
    },
    /**
     * 初始化资源树信息
     * @param isOpen
     */
    showDrawer (isOpen) {
      if (isOpen) {
        this.selectRule = {}
        findByRole(this.role.id).then(data => {
          this.selectRule = data.result
          console.info(this.selectRule)
        })
      }
    },
    /**
     * 为角色授权
     */
    handleAuth () {
      let ruleIds = []
      for (let key in this.selectRule) ruleIds.push(this.selectRule[key])

      auth(this.role.id, ruleIds).then(data => {
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
  .app-sys-role-data{
    .body{
      height: calc(100% - 60px);
      overflow-y: auto;
      .ivu-collapse{
        font-size: 17px;
        .ivu-collapse-content-box p{
          text-align: center;
          margin: 10px 0px;
        }
        .ivu-collapse-item {
          .ivu-collapse-header {
            height: 45px;
            line-height: 45px;
          }
        }
      }
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
