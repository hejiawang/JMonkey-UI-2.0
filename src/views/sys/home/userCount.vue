<template>
  <Row :gutter="20" style="margin-top: 20px;">
    <Col span="9">
      <Card>
        <ChartPie :value="userRoleData" text="系统用户角色统计" style="height: 280px;" ref="userRoleChart"/>
      </Card>
    </Col>
    <Col span="15">
      <Card>
        <ChartBar :value="userDeptData" text="系统用户所属部门分布统计" style="height: 280px;" ref="userDeptChart"/>
      </Card>
    </Col>
  </Row>
</template>
<script>
import { ChartPie, ChartBar } from '@/components/layout/charts'
import { userRole, userDept } from '@/api/sys/count'

export default {
  name: 'SysHomeUserCount',
  components: {ChartPie, ChartBar},
  data () {
    return {
      userDeptData: [],
      userRoleData: []
    }
  },
  created () {
    this.initUserRoleData()
    this.initUserDeptData()
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
    },
    /**
     * 系统用户所属部门分布统计
     */
    initUserDeptData () {
      userDept().then(data => {
        this.userDeptData = data.result

        this.$nextTick(() => { this.$refs.userDeptChart.resize() })
      })
    }
  }
}
</script>
