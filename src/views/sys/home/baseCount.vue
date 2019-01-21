<template>
  <Row :gutter="20">
    <Col span="6" style="height: 150px;" v-for="(info, index) in infoCardData" :key="'infor-' + index">
      <!-- TODO 这个样式应该抽出来一个公用组件 -->
      <Card :padding="0" class="info-card-wrapper">
        <div class="content-con">
          <div class="left-area" :style="{background: info.color}">
            <Icon :type="info.icon" color="white" size="70" />
          </div>
          <div class="right-area">
            <div>
              <span style="font-size: 65px">
                <CCountTo :end="info.count" count-class="count-style"/>
              </span>
              <p>{{info.title}}</p>
            </div>
          </div>
        </div>
      </Card>
    </Col>

    <Col span="6" style="text-align: center">
      <clock color="#19be6b"/>
    </Col>
  </Row>
</template>
<script>
import CCountTo from '@/components/layout/countTo'
import Clock from 'vue-clock2' // 时钟插件
import { base } from '@/api/sys/count'

export default {
  name: 'SysHomeBaseCount',
  components: { Clock, CCountTo },
  data () {
    return {
      infoCardData: [],
      infoCardConver: {
        'user': { title: '系统用户', icon: 'ios-contact', count: 0, color: '#ff9900' },
        'role': { title: '角色数量', icon: 'md-globe', count: 0, color: '#19be6b' },
        'dept': { title: '部门数量', icon: 'logo-xbox', count: 0, color: '#9A66E4' }
      }
    }
  },
  created () {
    base().then(data => {
      data.result.forEach(info => {
        let infoData = this.infoCardConver[info.name]
        infoData.count = info.value

        this.infoCardData.push(infoData)
      })
    })
  }
}
</script>
<style lang="scss">
  .info-card-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .ivu-card-body{
      width: 100%;
      height: 100%;
    }
    .content-con {
      width: 100%;
      height: 100%;
      position: relative;
      .left-area {
        float: left;
        height: 100%;
        width: 36%;
        display: table;
        text-align: center;
        & > .ivu-icon {
          display: table-cell;
          vertical-align: middle;
        }
      }
      .right-area {
        float: left;
        height: 100%;
        width: 64%;
        display: table;
        text-align: center;
        & > div {
          display: table-cell;
          vertical-align: middle;
        }
      }
    }
  }
</style>
