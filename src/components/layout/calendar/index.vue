<template>
  <Row class="app-layout-calendar">
    <Row class="title">
      <Col span="6" class="pre">
        <Icon color="#ff9900" type="ios-arrow-back" size="30" @click="preMouth"/>
        <Icon color="#ff9900" type="ios-arrow-forward" size="30" @click="nextMouth"/>
      </Col>
      <Col span="12" class="center">
        <span class="span-text" @click="goYear">{{currentYear}} 年 </span>
        <span class="span-text" @click="goMonth">{{currentMonth}} 月 </span>
      </Col>
      <Col span="6" class="next">
        <span class="span-text" @click="goNow">今日</span>
      </Col>
    </Row>

    <Row class="year_month" v-if="showYear">
      <div v-for="(y, index) in years" :key="index" @click="clickYear(y)">{{y}} 年</div>
    </Row>

    <Row class="year_month" v-if="showMonth">
      <div v-for="(m, index) in months" :key="index" @click="clickMonth(index)">{{m}}</div>
    </Row>

    <Row class="week" v-if="showDay">
      <div class="float-div" v-for="week in weeks" :key="week">{{week}}</div>
    </Row>

    <Row class="day" v-if="showDay">
      <template v-for="(dayobject, index) in days">
        <div :key="index" v-if="dayobject.day.getMonth() + 1 != currentMonth" class="float-div day-p-color" @click="clickDay(dayobject)">
          {{ dayobject.day.getDate() }}
        </div>

        <div :key="index" v-else class="float-div day-c-color" @click="clickDay(dayobject)">
          <Avatar v-if="dayobject.day.getFullYear() == selectYear && dayobject.day.getMonth() + 1 == selectMonth && dayobject.day.getDate() == selectDay">
            {{ dayobject.day.getDate() }}
          </Avatar>
          <span v-else>{{ dayobject.day.getDate() }}</span>
        </div>
      </template>
    </Row>
  </Row>
</template>
<script>
/**
 * TODO 代码太乱
 * 日历组件
 */
export default {
  name: 'CCalendar',
  data () {
    return {
      selectDay: 1,
      selectMonth: 1,
      selectYear: 1970,
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      showDay: true,
      showMonth: false,
      showYear: false,
      weeks: ['一', '二', '三', '四', '五', '六', '日'],
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    }
  },
  computed: {
    /**
     * return 每月周数 * 7
     */
    weekDayNum () {
      var str = new Date(this.formatDate(this.currentYear, this.currentMonth, 1))

      var year = str.getFullYear() // 当前年份
      var day = str.getDay() // 获取月份第一天是周几  周日是0
      var days = new Date(year, this.currentMonth, 0).getDate() // 获取当前月份的天数

      var first = 0 // 要减去开头的这几天
      day === 0 ? first = 1 : first = 8 - day
      days = days - first

      return (1 + Math.ceil(days / 7)) * 7
    },
    /**
     * years
     */
    years () {
      let yearsArray = []

      let miniYear = this.currentYear - 4
      for (let i = miniYear; i < miniYear + 12; i++) {
        yearsArray.push(i)
      }

      return yearsArray
    }
  },
  created () {
    this.initDatas(null)
    this.initSelectData(new Date())
  },
  methods: {
    /**
     * init days data
     */
    initDatas (cur) {
      this.buildCurrentInfo(cur)

      this.days.length = 0
      let str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)
      this.foreachCurrentWeek(str)
      this.foreachOtherWeek(str)
    },
    /**
     * 初始化本周
     * 今天是周日，放在第一行第7个位置，前面6个
     */
    foreachCurrentWeek (str) {
      for (let i = this.currentWeek - 1; i >= 0; i--) {
        let d = new Date(str)
        d.setDate(d.getDate() - i)

        let dayobject = {} // 用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day = d

        this.days.push(dayobject) // 将日期放入data 中的days数组 供页面渲染使用
      }
    },
    /**
     * 其他周
     */
    foreachOtherWeek (str) {
      for (let i = 1; i <= this.weekDayNum - this.currentWeek; i++) {
        let d = new Date(str)
        d.setDate(d.getDate() + i)

        let dayobject = {}
        dayobject.day = d

        this.days.push(dayobject)
      }
    },
    /**
     * 构建当前年 月 日 周 信息
     */
    buildCurrentInfo (cur) {
      let date = this.renderDate(cur)

      this.currentDay = date.getDate()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1

      this.currentWeek = date.getDay()
      if (this.currentWeek === 0) this.currentWeek = 7
    },
    /**
     * 拼接当前日期
     * @param cur 当前日期
     * @returns {string} Date
     */
    renderDate (cur) {
      let date
      if (!this.$CV.isEmpty(cur)) {
        date = new Date(cur)
      } else {
        let now = new Date()
        date = new Date(this.formatDate(now.getFullYear(), now.getMonth() + 1, 1))
      }

      return date
    },
    /**
     * 返回 类似 2019-01-01 格式的字符串
     * @param year year
     * @param month month
     * @param day day
     * @returns {string} 类似 2019-01-01 格式的字符串
     */
    formatDate: function (year, month, day) {
      let y = year

      let m = month
      if (m < 10) m = '0' + m

      let d = day
      if (d < 10) d = '0' + d

      return y + '-' + m + '-' + d
    },
    /**
     * 默认选择当天
     */
    initSelectData (d) {
      let data
      if (d instanceof Date) data = d
      else data = new Date(d)

      this.selectDay = data.getDate()
      this.selectMonth = data.getMonth() + 1
      this.selectYear = data.getFullYear()
    },
    /**
     * 上一个月
     */
    preMouth () {
      let d = new Date(this.formatDate(this.currentYear, this.currentMonth, 1))
      d.setDate(0)
      this.initDatas(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    /**
     * 下一个月
     */
    nextMouth () {
      let d = new Date(this.formatDate(this.currentYear, this.currentMonth, 1))
      d.setDate(45)
      this.initDatas(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    /**
     * 定位到今天
     */
    goNow () {
      let data = new Date()
      this.selectDay = data.getDate()
      this.selectMonth = data.getMonth() + 1
      this.selectYear = data.getFullYear()

      this.showDay = true; this.showMonth = false; this.showYear = false

      this.initDatas(null)
    },
    /**
     * 日期选择事件
     * @param dayObject dayObject
     */
    clickDay (dayObject) {
      let data = dayObject.day
      this.selectDay = data.getDate()
      this.selectMonth = data.getMonth() + 1
      this.selectYear = data.getFullYear()

      // 如果选择的日期不在本月
      // TODO 算法好像不太对 bug高危区
      if (this.selectYear === this.currentYear) {
        if (this.selectMonth < this.currentMonth) this.preMouth()
        if (this.selectMonth > this.currentMonth) this.nextMouth()
      } else if (this.selectYear < this.currentYear) {
        this.preMouth()
      } else if (this.selectYear > this.currentYear) {
        this.nextMouth()
      }

      this.$emit('click', dayObject.day)
    },
    /**
     * 显示月份选择页面
     */
    goMonth () {
      this.showDay = false; this.showMonth = true; this.showYear = false
    },
    /**
     * 选择月份
     * @param month month
     */
    clickMonth (month) {
      this.showDay = true; this.showMonth = false; this.showYear = false
      this.initDatas(this.formatDate(this.currentYear, month + 1, 1))
    },
    /**
     * 显示年份选择页面
     */
    goYear () {
      this.showDay = false; this.showMonth = false; this.showYear = true
    },
    /**
     * 选择年份
     * @param year year
     */
    clickYear (year) {
      this.showDay = true; this.showMonth = false; this.showYear = false
      this.initDatas(this.formatDate(year, this.currentMonth, 1))
    }
  }
}
</script>
<style lang="scss">
  .app-layout-calendar{
    .title {
      height: 50px;
      font-size: 20px;
      line-height: 50px;
      background: #5cadff;
      color: #f8f8f9;
      .pre {
        padding-left: 10px;
        .ivu-icon {
          cursor:pointer;
        }
      }
      .center {
        text-align: center
      }
      .next {
        padding-right: 10px;
        text-align: right;
      }
      .span-text {
        color: #ff9900;
        cursor:pointer;
      }
    }

    .year_month {
      border: 1px solid #5cadff;
      font-size: 20px;
      line-height: 65px;
      text-align: center;
      div {
        height: 65px;
        cursor: pointer;
        width: 33.33%;
        float: left;
      }
      div:hover {
        background: #2db7f5;
        color: #f8f8f9;
      }
    }

    .week {
      font-size: 20px;
      line-height: 50px;
      background: #5cadff;
      text-align: center;
      color: #f8f8f9;
    }

    .day {
      border: 1px solid #5cadff;
      font-size: 20px;
      line-height: 50px;
      text-align: center;

      .ivu-avatar {
        background: #19be6b;
      }

      div {
        cursor:pointer;
      }

      div:hover {
        background: #2db7f5;
        color: #f8f8f9;
      }
    }

    .float-div {
      width: 14.28%;
      height: 50px;
      float: left;
    }

    .day-c-color {
      color: #515a6e;
    }

    .day-p-color {
      color: #c5c8ce;
    }
  }
</style>
