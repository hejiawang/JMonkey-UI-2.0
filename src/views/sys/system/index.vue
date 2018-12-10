<template>
  <Layout v-layoutIn>
    <Row>
      <Button type="primary"  @click="raiseHandle">新增</Button>
    </Row>
    <Row :gutter="20" >
      <Col span="6" style="margin-top: 40px;" v-for=" system in dataList " :key="system.id">
        <Card >
          <p slot="title">
            <Icon :type="system.icon" />
            <span>{{ system.name }}</span>
          </p>
          <a href="#" slot="extra" @click="modifyHandle(system)"> <Icon type="ios-create-outline" size="26"/> </a>
          <a href="#" slot="extra" @click="deleteHandle(system)"> <Icon type="ios-trash" size="26"/> </a>
          <Row :gutter="10">
            <Col span="12">是否显示：{{ system.isShow | yesOrNoFilter }}</Col>
            <Col span="12">显示方式：{{ system.showType | showTypeFilter }}</Col>
          </Row>
          <Row :gutter="10" style="margin-top: 16px;">
            <Col span="12">放置引导页：{{ system.showGuide | yesOrNoFilter }}</Col>
            <Col span="12">引导页菜单：{{ system.showMenu | yesOrNoFilter }}</Col>
          </Row>
          <Row :gutter="10" style="margin-top: 16px;">
            <Col span="12">排序：{{ system.sort }}</Col>
          </Row>
        </Card>
      </Col>
    </Row>

    <CSystemForm v-model="showForm" :type="formType" :systemId="currentSystemId" @refresh="initList"></CSystemForm>
  </Layout>
</template>
<script>
import { list, del } from '@/api/sys/system'
import CSystemForm from '@/views/sys/system/form'

export default {
  name: 'SysSystem',
  components: {
    CSystemForm
  },
  filters: {
    yesOrNoFilter (val) {
      const valMap = {
        Yes: '是',
        No: '否'
      }
      return valMap[val]
    },
    showTypeFilter (val) {
      const valMap = {
        Tabs: '标签页',
        Breadcrumb: '导航条'
      }
      return valMap[val]
    }
  },
  data () {
    return {
      dataList: [],
      formType: '',
      showForm: false,
      currentSystemId: ''
    }
  },
  created () {
    this.initList()
  },
  methods: {
    /**
     * 获取系统列表
     */
    initList () {
      list().then(data => {
        this.dataList = data.result
      })
    },
    /**
     * 删除系统信息
     * @param systemId 系统信息id
     */
    deleteHandle (system) {
      this.$CDelete({
        'content': '<p>名称为 <span style="color: #f60">' + system.name + '</span> 的系统将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          del(system.id).then(() => {
            this.initList()
            this.$Message.success('删除成功')
          })
        }
      })
    },
    /**
     * 新增系统信息
     */
    raiseHandle () {
      this.formType = 'raise'; this.showForm = true
    },
    /**
     * 修改系统信息
     * @param system 将要修改的系统信息
     */
    modifyHandle (system) {
      this.formType = 'modify'; this.showForm = true; this.currentSystemId = system.id
    }
  }
}
</script>
