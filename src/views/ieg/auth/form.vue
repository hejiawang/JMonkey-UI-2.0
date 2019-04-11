<template>
  <Drawer :title="'院校维护权限授权 【' + user.realName + '】 '" v-model="isShow" width="600"
          @on-visible-change="showDrawer" class="ieg-auth-form">
    <Row class="body">
      <Row style="height: 60px;">
        <Form ref="searchForm" :model="listQuery" :label-width="80" inline @submit.native.prevent>
          <FormItem label="院校名称">
            <Input type="text" v-model="listQuery.name" style="width: 370px;"/>
          </FormItem>
          <FormItem :label-width="0">
            <ButtonGroup>
              <Button icon="ios-search" @click="search" />
              <Button icon="ios-trash-outline" @click="restSearch" />
            </ButtonGroup>
          </FormItem>
        </Form>
      </Row>
      <Row>
        <CheckboxGroup v-model="schoolAuths">
          <Table :height="schoolTableHeight" border :columns="schoolTableColumns" :data="schoolTableData" stripe/>
        </CheckboxGroup>
      </Row>
      <Row>
        <CPage v-model="listQuery" @on-list="initList" ref="schoolPage"/>
      </Row>
    </Row>
    <Row class="bottom">
      <Button type="success" long @click="handleAuth"> 授&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;权 </Button>
    </Row>
  </Drawer>
</template>
<script>
import store from '@/store'
import { list } from '@/api/ieg/school'
import { findShcoolIdByUser, auth } from '@/api/ieg/auth'

export default {
  name: 'IegAuth-Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    user: {type: Object, default: null, required: true}
  },
  computed: {
    /**
     * 列表高度
     */
    schoolTableHeight () {
      return store.getters.windowHeight - 250
    }
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  created () {
    this.initTableColumns()
    this.initList()
  },
  data () {
    return {
      schoolAuths: [],
      isShow: false,
      schoolTableColumns: [],
      schoolTableData: [],
      listQuery: {
        name: null,
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  methods: {
    /**
     * init table coluimns
     */
    initTableColumns () {
      this.schoolTableColumns = [
        {
          title: ' ',
          key: 'id',
          width: 60,
          align: 'center',
          render: (h, params) => {
            return h('Checkbox', {
              props: { label: params.row.id }
            }, '  ')
          }
        },
        {title: '院校名称', key: 'name', tooltip: true},
        {title: '院校编码', key: 'code', tooltip: true, width: 120}
      ]
    },
    /**
     * 初始化院校table
     */
    initList () {
      list(this.listQuery).then(data => {
        this.schoolTableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})
      })
    },
    /**
     * 重置检索条件
     */
    restSearch () {
      ['name'].forEach(param => (
        this.listQuery[param] = null
      ))
      this.search()
    },
    /**
     * 检索院校
     */
    search () {
      this.$refs.schoolPage.rest()
      this.initList()
    },
    /**
     * 为用户授权
     */
    handleAuth () {
      auth(this.user.id, this.schoolAuths).then(data => {
        if (data.isSuccess) {
          this.$Message.success('授权成功')
          this.isShow = false
        }
      })
    },
    /**
     * 获取用户授权信息
     * @param isOpen
     */
    showDrawer (isOpen) {
      if (isOpen) {
        this.schoolAuths = []
        findShcoolIdByUser(this.user.id).then(data => { this.schoolAuths = data.result })
      }
    }
  }
}
</script>
<style lang="scss">
  .ieg-auth-form{
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
