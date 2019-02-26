<template>
  <Row class="app-sys-home-notepad">
    <Row :gutter="20">
      <Col span="12">
        <CCalendar @click="selectCalendar"/>
      </Col>

      <Col span="12">
        <Row class="hvr-wobble-horizontal margin-b">
          <Card>
            <div class="left"> <Icon type="ios-bonfire" size="80" color="#2b85e4"/> </div>
            <div class="right">
              <div class="num" style="color: #2b85e4;">80 %</div>
              <div><Progress :percent="80" status="active" hide-info/></div>
              <div style="color: #2b85e4;">机器负载</div>
            </div>
          </Card>
        </Row>

        <Row class="hvr-wobble-horizontal margin-b">
          <Card>
            <div class="left"> <Icon type="logo-css3" size="80" color="#19be6b"/> </div>
            <div class="right">
              <div class="num" style="color: #19be6b;">100 %</div>
              <div><Progress :percent="100" status="active" hide-info/></div>
              <div style="color: #19be6b;">安全指数</div>
            </div>
          </Card>
        </Row>

        <Row class="hvr-wobble-horizontal">
          <Card>
            <div class="left"> <Icon type="ios-paper-plane-outline" size="80" color="#ed3f14"/> </div>
            <div class="right">
              <div class="num" style="color: #ed3f14;">40 %</div>
              <div class="t-b"><Progress :percent="40" status="active" hide-info/></div>
              <div style="color: #ed3f14;">积极反馈</div>
            </div>
          </Card>
        </Row>
      </Col>
    </Row>
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
<style lang="scss">
  .app-sys-home-notepad{
    margin-top: 20px;
    .hvr-wobble-horizontal{
      height: 100px;
      .ivu-card{
        height: 100px;
        .ivu-card-body{
          padding: 5px;
          .left {
            float: left;
            height: 90px;
            width: 90px;
            line-height: 90px;
          }
          .right{
            margin-right: 10px;
            float: left;
            width: calc(100% - 100px);
            .num{
              font-size: 25px;
            }
            .t-b{
              .ivu-progress-bg {
                background-color: #ed3f14;
              }
            }
          }
        }
      }
    }
    .margin-b{
      margin-bottom: 20px;
    }
  }
</style>
