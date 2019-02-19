<template>
  <Row style="margin-top: 20px;">
    <Card>
      <Row :gutter="20">
        <Col span="12">
          <CCalendar @click="selectCalendar"/>
        </Col>
        <Col span="12">2</Col>
      </Row>
    </Card>
  </Row>
</template>
<script>
import CCalendar from '@/components/layout/calendar'

/**
 * 日历形式的记事本
 */
export default {
  name: 'SysHomeNotepad',
  components: {CCalendar},
  data () {
    return {}
  },
  methods: {
    /**
     * 日历的点击事件
     * @param date 选择日历的日期
     */
    selectCalendar (date) {
      console.info(date)
    }
  }
}
</script>
