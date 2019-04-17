<template>
  <Drawer :title="drawerTitle" width="1200" v-model="isShow"
          @on-visible-change="showDrawer" class="ieg-enroll-info">
    <CIegEnrollInfoForm :enroll="enroll" @refresh="initList" v-if="tableData.length === 0"/>

    <Row v-else>
      <Row>
        <Button type="error" long @click="deleteHandle">重 新 上 传 文 件</Button>
      </Row>
      <Row style="margin-top: 20px;">
        <Table :height="tableHeight" border :columns="tableColumns" :data="tableData" :loading="listLoading" stripe/>
      </Row>
      <Row>
        <CPage v-model="listQuery" @on-list="initList" ref="enrollInfoPage"/>
      </Row>
    </Row>
  </Drawer>
</template>
<script>
import CIegEnrollInfoForm from '@/views/ieg/enrollInfo/form'
import { list, delByEnroll } from '@/api/ieg/enrollInfo'
import store from '@/store'

export default {
  name: 'IegEnrollInfo',
  components: {
    CIegEnrollInfoForm
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  props: {
    value: {type: Boolean, default: false, required: true},
    enroll: { required: true }
  },
  computed: {
    /**
     * 抽屉头部tile
     */
    drawerTitle () {
      if (this.$CV.isEmpty(this.enroll)) {
        return ''
      } else {
        return '投档分数线: ' +
          this.enroll.year + '年 ' +
          this.courseType[this.enroll.courseType] + ' ' +
          this.degreeType[this.enroll.degreeType] + ' ' +
          this.enrollType[this.enroll.enrollType]
      }
    },
    /**
     * 列表高度
     */
    tableHeight () {
      return store.getters.windowHeight - 200
    }
  },
  data () {
    return {
      isShow: false,
      courseType: { W: '文科', L: '理科' },
      degreeType: { B: '本科', Z: '专科' },
      enrollType: { Common: '普通', Art: '艺术', Gym: '体育' },
      listLoading: false,
      listQuery: {
        size: 10,
        total: 0
      },
      tableData: [],
      tableColumns: []
    }
  },
  created () {
    this.initTableColumns()
  },
  methods: {
    /**
     * init table colums
     */
    initTableColumns () {
      this.tableColumns = [
        {title: '院校代号', key: 'schoolCode', tooltip: true, width: 120},
        {title: '院校名称', key: 'schoolName', tooltip: true},
        {title: '投档单位', key: 'submitCode', tooltip: true, width: 120},
        {title: '投档人数', key: 'number', tooltip: true, width: 120},
        {title: '最低投档分数', key: 'scoreMin', tooltip: true},
        {title: '最高投档分数', key: 'scoreMax', tooltip: true}
      ]
    },
    /**
     * init table list data
     */
    initList () {
      this.listLoading = true

      this.listQuery.enrollId = this.enroll.id
      list(this.listQuery).then(data => {
        this.tableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})

        this.listLoading = false
      })
    },
    /**
     * open drawer
     * @param isOpen true
     */
    showDrawer (isOpen) {
      if (isOpen) {
        this.initList()
      }
    },
    /**
     * 清空投档分数线信息
     */
    deleteHandle () {
      this.$CDelete({
        'content': '<p><span style="color: #f60">' + this.drawerTitle + '</span></p><p>将被清空, 是否继续？</p>',
        'confirm': () => {
          delByEnroll(this.enroll.id).then((data) => {
            this.initList()

            if (data.result) this.$Message.success('删除成功')
            else this.$Message.error('删除失败')
          })
        }
      })
    }
  }
}
</script>
