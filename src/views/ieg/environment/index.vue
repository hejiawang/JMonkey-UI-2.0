<template>
  <Layout v-layoutIn>
    <Row style="height: 60px;">
      <Button type="primary" icon="ios-add-circle-outline" @click="raiseHandle">新增</Button>
    </Row>
    <Row :gutter="32">
      <Col span="4">
        <Tree :data="treeDate" ref="areaTree" @on-select-change="selectArea"/>
      </Col>
      <Col span="20">
        <Card v-if="currentEnvironment">
          {{currentEnvironment.id}}
        </Card>
      </Col>
    </Row>

    <CIegEnvironmentForm v-model="showForm" :type="formType" :environment="currentEnvironment" @refresh="initAreaTree"/>
  </Layout>
</template>
<script>
import CIegEnvironmentForm from '@/views/ieg/environment/form'
import { tree, findByAreaCity } from '@/api/ieg/environment'
import Vue from 'vue'
import pca from 'area-data/pca'

export default {
  name: 'IegEnvironment',
  components: {
    CIegEnvironmentForm
  },
  computed: {
    /**
     * 转换tree控件展示的title
     * @returns {*}
     */
    treeDate () {
      let tmpTreeData = Array.isArray(this.areaTreeDate) ? this.areaTreeDate : [this.areaTreeDate]
      return this.converAreaTree(tmpTreeData)
    }
  },
  data () {
    return {
      showForm: false,
      formType: '',
      currentEnvironment: null,
      areaTreeDate: []
    }
  },
  created () {
    this.initAreaTree()
  },
  methods: {
    /**
     * 初始化地区树
     */
    initAreaTree () {
      tree().then(data => {
        this.areaTreeDate = data.result
      })
    },
    /**
     * 转换树结构数据
     * @param data
     * @returns {*}
     */
    converAreaTree (data) {
      Array.from(data).forEach(tData => {
        let areaName = this.$CV.isEmpty(tData.parentId) ? pca['86'][tData.id] : pca[tData.parentId][tData.id]
        if (this.$CV.isEmpty(areaName)) areaName = '市辖区'
        Vue.set(tData, 'title', areaName)

        if (tData.children && tData.children.length > 0) this.converAreaTree(tData.children)
      })

      return data
    },
    /**
     * 新增信息
     */
    raiseHandle () {
      this.formType = 'raise'; this.showForm = true
    },
    /**
     * 选择区域
     * @param row
     */
    selectArea (row) {
      if (this.$CV.isEmpty(row)) this.currentEnvironment = null
      else {
        findByAreaCity(row[0].id).then(data => {
          this.currentEnvironment = data.result
        })
      }
    }
  }
}
</script>
