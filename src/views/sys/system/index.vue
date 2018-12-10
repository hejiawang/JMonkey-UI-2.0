<template>
  <Layout v-layoutIn>
    <Row>
      <Button type="primary"  @click="raiseHandle">新增</Button>
    </Row>
    <Row :gutter="40" >
      <Col span="6" style="margin-top: 40px;" v-for=" system in dataList " :key="system.id">
        <Card >
          <p slot="title">
            <Icon :type="system.icon" />
            <span>{{ system.name }}</span>
          </p>
          <a href="#" slot="extra"> <Icon type="ios-create-outline" size="26"/> </a>
          <a href="#" slot="extra"> <Icon type="ios-trash" size="26"/> </a>
          <Row :gutter="10">
            <Col span="12">是否显示：{{ system.isShow }}</Col>
            <Col span="12">显示方式：{{ system.showType }}</Col>
          </Row>
          <Row :gutter="10" style="margin-top: 16px;">
            <Col span="12">放置引导页：{{ system.showGuide }}</Col>
            <Col span="12">引导页菜单：{{ system.showMenu }}</Col>
          </Row>
          <Row :gutter="10" style="margin-top: 16px;">
            <Col span="12">排序：{{ system.sort }}</Col>
          </Row>
        </Card>
      </Col>
    </Row>

    <CSystemForm v-model="showForm" :type="formType" @refresh="restForm"></CSystemForm>
  </Layout>
</template>
<script>
import CSystemForm from '@/views/sys/system/form'

export default {
  name: 'SysSystem',
  components: {
    CSystemForm
  },
  data () {
    return {
      dataList: [],
      formType: '',
      showForm: false
    }
  },
  created () {
    this.dataList = [
      { id: '123', icon: 'ios-apps', name: '系统设置', isShow: 'Yes', showType: 'Tabs', showGuide: 'Yes', showMenu: 'Yes', sort: 10 }
    ]
  },
  methods: {
    raiseHandle () {
      this.formType = 'Raise'; this.showForm = true
    },
    restForm () {
      console.info(1)
    }
  }
}
</script>
