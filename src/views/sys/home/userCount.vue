<template>
  <Row :gutter="20" style="margin-top: 20px;">
    <Col span="9">
      <Card>
        <ChartPie :value="pieData" text="系统用户所属部门分布统计" style="height: 280px;"/>
      </Card>
    </Col>
    <Col span="15">
      <Card>
        <ChartBar :value="userRoleData" text="系统用户角色统计" style="height: 280px;" ref="userRoleChart"/>
      </Card>
    </Col>
  </Row>
</template>
<script>
import { ChartPie, ChartBar } from '@/components/layout/charts'
import { userRole } from '@/api/sys/count'

export default {
  name: 'SysHomeUserCount',
  components: {ChartPie, ChartBar},
  data () {
    return {
      pieData: [
        {value: 335, name: '技术部'},
        {value: 310, name: '财务部'},
        {value: 234, name: '开发组'},
        {value: 135, name: '测试组'},
        {value: 1548, name: '销售部'}
      ],
      userRoleData: []
    }
  },
  created () {
    this.initUserRoleData()
  },
  methods: {
    /**
     * 获取系统用户角色统计数据
     */
    initUserRoleData () {
      userRole().then(data => {
        this.userRoleData = data.result

        this.$nextTick(() => { this.$refs.userRoleChart.resize() })
      })
    }
  }
}
</script>
