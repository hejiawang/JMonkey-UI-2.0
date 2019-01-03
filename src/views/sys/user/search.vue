<template>
  <Drawer title="用户信息检索" v-model="isShow" width="400" class="app-sys-user-search">
    <Form ref="userSearchForm" :model="listQuery" :label-width="80" style="margin-top: 30px;">
      <FormItem label="用户名称">
        <Input type="text" v-model.trim="listQuery.username" :maxlength="50" clearable/>
      </FormItem>
      <FormItem label="真实姓名">
        <Input type="text" v-model.trim="listQuery.realName" :maxlength="50" clearable/>
      </FormItem>
      <FormItem label="手机号码">
        <Input type="text" v-model.trim="listQuery.phone" :maxlength="11" clearable/>
      </FormItem>
      <FormItem label="用户性别">
        <RadioGroup v-model="listQuery.sex">
          <Radio label="Man">男</Radio>
          <Radio label="Woman">女</Radio>
          <Radio label="Other">其他</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="用户角色">
        <CRole v-model="listQuery.roleId" />
      </FormItem>
      <FormItem label="归属部门" prop="deptIds">
        <CDept v-model="listQuery.deptId"/>
      </FormItem>
    </Form>

    <Row :gutter="20" class="search-bottom">
      <Col span="12">
        <Button long icon="ios-trash-outline" @click="restSearch">重置</Button>
      </Col>
      <Col span="12">
        <Button long icon="ios-search" type="primary" @click="search">检索</Button>
      </Col>
    </Row>

  </Drawer>
</template>
<script>
import CRole from '@/components/sys/role'
import CDept from '@/components/sys/dept'

export default {
  name: 'SysUser_Search',
  components: { CRole, CDept },
  props: {
    value: {type: Boolean, default: false, required: true},
    listQuery: {type: Object, default: null, required: true}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    restSearch () {
      this.$emit('rest', '')
    },
    search () {
      this.$emit('search', '')
    }
  }
}
</script>
<style lang="scss">
  .app-sys-user-search{
    .search-bottom{
      position: absolute;
      width: calc(100% - 10px);
      border-top: 1px solid #e8e8e8;
      padding: 10px;
      bottom: 0px;
    }
  }
</style>
