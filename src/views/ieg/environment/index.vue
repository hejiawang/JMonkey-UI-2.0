<template>
  <Layout v-layoutIn class="ieg-environment">
    <Row style="height: 60px;">
      <Button type="primary" icon="ios-add-circle-outline" @click="raiseHandle">新增</Button>
    </Row>
    <Row :gutter="32" class="ieg-environment-main">
      <Col span="4" class="ieg-environment-main-left">
        <Tree :data="treeDate" ref="areaTree" @on-select-change="selectArea"/>
      </Col>
      <Col span="20" class="ieg-environment-main-right">
        <Card v-if="currentEnvironment">
          <Row>
            <span>{{areaProvinceName}}</span>
            <span> - </span>
            <span>{{areaCityName}}</span>

            <Button type="error" ghost icon="ios-trash-outline" style="float: right;" @click="deleteHandle">删除</Button>
            <Button type="warning" ghost icon="ios-brush-outline" style="float: right;" @click="modifyHandle">修改</Button>
          </Row>
          <Row v-if="currentEnvironment.source">
            <span>信息来源：</span>
            <span> {{currentEnvironment.source}} </span>
          </Row>
          <Divider><Icon type="ios-information-circle-outline" size="16"/> 简介 </Divider>
          <Row class="describe-body ql-container ql-snow" v-if="currentEnvironment.describe">
            <Row class="ql-editor" v-html="currentEnvironment.describe" />
          </Row>
        </Card>
      </Col>
    </Row>

    <CIegEnvironmentForm v-model="showForm" :type="formType" :environment="currentEnvironment" @refresh="initAreaTree"/>
  </Layout>
</template>
<script>
import CIegEnvironmentForm from '@/views/ieg/environment/form'
import { tree, findByAreaCity, del } from '@/api/ieg/environment'
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
    },
    /**
     * 省——名称
     */
    areaProvinceName () {
      if (this.$CV.isEmpty(this.currentEnvironment)) return ''
      else return pca['86'][this.currentEnvironment.areaProvince]
    },
    /**
     * 市——名称
     */
    areaCityName () {
      if (this.$CV.isEmpty(this.currentEnvironment)) return ''
      else return pca[this.currentEnvironment.areaProvince][this.currentEnvironment.areaCity]
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
      this.currentEnvironment = null

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
     * 修改信息
     */
    modifyHandle () {
      this.formType = 'modify'; this.showForm = true
    },
    /**
     * 删除信息
     */
    deleteHandle () {
      this.$CDelete({
        'content': '<p><span style="color: #f60">' + this.areaProvinceName + this.areaCityName + '</span> 地区的信息将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          del(this.currentEnvironment.id).then((data) => {
            this.initAreaTree()

            if (data.result) this.$Message.success('删除成功')
            else this.$Message.error('删除失败')
          })
        }
      })
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
<style lang="scss">
  .ieg-environment {
    .ieg-environment-main {
      height: calc(100% - 60px);
      .ieg-environment-main-left {
        height: 100%;
        overflow-y: auto;
      }
      .ieg-environment-main-right {
        height: 100%;
        .ivu-card {
          height: 100%;
          .ivu-card-body {
            height: 100%;
            .describe-body {
              height: calc(100% - 120px);
              overflow-y: auto;
              border: 0px;
            }
          }
        }
      }
    }
  }
</style>
