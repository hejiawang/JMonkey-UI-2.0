<template>
  <Row>
    <Input type="text" v-model="majorName" icon="ios-close" @on-focus="showMajorTree" @on-click="clearMajor"
           readonly :disabled="disabled"/>

    <Modal v-model="isShow" :title="title" @on-visible-change="visibleChange" footer-hide class="app-layout-major">
      <Row class="app-layout-major-degree">
        <Tabs @on-click="selectDegreeHandle">
          <TabPane label="本科" icon="ios-cube-outline" name="B"/>
          <TabPane label="专科" icon="md-crop" name="Z"/>
        </Tabs>
      </Row>
      <Row class="app-layout-major-tree">
        <Tree :data="treeDate" ref="magorTree" @on-select-change="selectMagor"/>
      </Row>
    </Modal>
  </Row>
</template>
<script>
import { tree, findDto } from '@/api/ieg/major'
import { converKey } from '@/utils/common'

export default {
  name: 'CIegMajor',
  props: {
    value: {type: String, default: null, required: false},
    title: {type: String, default: '请选择专业', required: false},
    disabled: {type: Boolean, default: false, required: false},
    level: {type: String, default: 'One', required: false}
  },
  watch: {
    value (val) {
      this.deptId = val

      if (this.$CV.isEmpty(val)) {
        this.majorName = null
      } else {
        findDto(val).then(data => { this.majorName = data.result.name })
      }
    },
    majorId (val) { this.$emit('input', val) }
  },
  computed: {
    /**
     * 转换tree控件展示的title
     * @returns {*}
     */
    treeDate () {
      let tmpTreeData = Array.isArray(this.magorTreeDate) ? this.magorTreeDate : [this.magorTreeDate]
      return converKey(tmpTreeData)
    }
  },
  data: function () {
    return {
      majorId: null,
      majorName: null,
      isShow: false,
      selectDegree: 'B',
      magorTreeDate: []
    }
  },
  methods: {
    /**
     * show major tree modal
     */
    showMajorTree () {
      this.isShow = true
    },
    clearMajor () {},
    /**
     * init major tree data
     * @param isOpen true
     */
    visibleChange (isOpen) {
      if (isOpen) {
        tree({degreeType: this.selectDegree}).then(data => {
          this.magorTreeDate = data.result
        })
      }
    },
    /**
     * 选择专业类型
     * @param tabName 专业类型名称
     */
    selectDegreeHandle (tabName) {
      this.selectDegree = tabName

      tree({degreeType: this.selectDegree}).then(data => {
        this.magorTreeDate = data.result
      })
    },
    /**
     * 选择上级专业
     * @param row
     */
    selectMagor (row) {
      if (this.$CV.isEmpty(row) || this.level === 'One') return

      if ((this.level === 'Two' && row[0].levelType === 'One') ||
        (this.level === 'Three' && row[0].levelType === 'Two')) {
        this.majorId = row[0].id; this.majorName = row[0].name
        this.isShow = false
      }
    }
  }
}
</script>
<style lang="scss">
  .app-layout-major {
    .app-layout-major-degree {
      height: 60px;
      .ivu-tabs-nav-container{
        font-size: 17px;
      }
      .ivu-tabs-nav .ivu-tabs-tab .ivu-icon{
        width: 17px;
        height: 17px;
      }
    }
    .app-layout-major-tree {
      height: 500px;
      overflow-y: auto;
    }
  }
</style>
