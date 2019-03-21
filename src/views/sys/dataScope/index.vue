<template>
  <Layout v-layoutIn class="app-sys-dataScope">
    <Row :gutter="32" class="dataScope-main">
      <Col span="8" class="dataScope-left">
        <Row class="dataScope-left-event">
          <ButtonGroup >
            <Button type="primary" icon="ios-add-circle-outline" @click="raiseHandle"> 新增 </Button>
            <Button type="warning" icon="ios-brush-outline" @click="modifyHandle"> 修改 </Button>
            <Button type="error" icon="ios-trash-outline" @click="deleteHandle"> 删除 </Button>
          </ButtonGroup>
        </Row>
        <Row class="dataScope-left-content">
          <Spin size="large" fix v-if="listLoading"/>
          <div class="dataScope-left-info" v-for="dataScope in dataScopeList" :key="dataScope.id" @click="selectHandle(dataScope)">
            <p class="dataScope-left-name">{{dataScope.name}}</p>
            <p class="dataScope-left-url">{{dataScope.url}}</p>

            <div class="dataScope-left-select-block" v-if="dataScopeC !== null && dataScope.id === dataScopeC.id"> <Icon type="md-checkmark" size="30" color="#19be6b"/> </div>
            <div class="dataScope-left-select" v-else> <Icon type="md-checkmark" size="30" color="#19be6b"/> </div>
          </div>
        </Row>

        <CPage v-model="listQuery" @on-list="initList" ref="dataScopePage"/>
      </Col>
      <Col span="16" class="dataScope-right">
        <CDataScopRule :dataScope="dataScopeC"/>
      </Col>
    </Row>

    <CDataScopForm v-model="showForm" :type="formType" :dataScope="dataScopeC" @refresh="initList"/>
  </Layout>
</template>
<script>
import CDataScopForm from '@/views/sys/dataScope/form'
import CDataScopRule from '@/views/sys/dataScopeRule'
import { list, del } from '@/api/sys/dataScope'

export default {
  name: 'SysDataScope',
  components: {
    CDataScopForm, CDataScopRule
  },
  data () {
    return {
      listLoading: false,
      showForm: false,
      formType: '',
      listQuery: {
        current: 1,
        size: 10,
        total: 0
      },
      dataScopeList: [],
      dataScopeC: null
    }
  },
  created () {
    this.initList()
  },
  methods: {
    /**
     * init data scope list data
     */
    initList () {
      this.dataScopeC = null

      this.listLoading = true
      list(this.listQuery).then(data => {
        this.dataScopeList = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})

        this.listLoading = false
      })
    },
    /**
     * raise handle
     */
    raiseHandle () {
      this.dataScopeC = null; this.formType = 'raise'; this.showForm = true
    },
    /**
     * modify handle
     */
    modifyHandle () {
      if (this.$CV.isEmpty(this.dataScopeC)) {
        this.$Message.error('请选择数据规则')
        return
      }

      this.formType = 'modify'; this.showForm = true
    },
    /**
     * delete
     */
    deleteHandle () {
      if (this.$CV.isEmpty(this.dataScopeC)) {
        this.$Message.error('请选择数据规则')
        return
      }

      this.$CDelete({
        'content': '<p>名称为 <span style="color: #f60">' + this.dataScopeC.name + '</span> 的数据规则将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          del(this.dataScopeC.id).then(() => {
            this.initList()
            this.$Message.success('删除成功')
          })
        }
      })
    },
    /**
     * select current handle
     * @param dataScope
     */
    selectHandle (dataScope) {
      this.dataScopeC = dataScope
    }
  }
}
</script>
<style lang="scss">
  .app-sys-dataScope {
    .dataScope-main {
      height: 100%;
      .dataScope-left {
        height: 100%;
        .dataScope-left-event {
          height: 60px;
        }
        .dataScope-left-content {
          height: calc(100% - 105px);
          overflow-y: auto;
          .dataScope-left-info {
            line-height: 35px;
            height: 70px;
            width: 100%;
            padding-left: 15px;
            border-bottom: 1px solid #5cadff;
            margin-bottom: 15px;
            cursor:pointer;
            .dataScope-left-name {
              color: #17233d;
              font-size: 20px;
            }
            .dataScope-left-url {
              font-size: 17px;
            }
            .dataScope-left-select {
              position: relative;
              float: right;
              right: 20px;
              top: -50px;
              display: none;
            }
            .dataScope-left-select-block {
              position: relative;
              float: right;
              right: 20px;
              top: -50px;
              display: block;
            }
          }

          .dataScope-left-info:hover .dataScope-left-select{
            display: block;
          }
        }
      }
      .dataScope-right {
        height: 100%;
      }
    }
  }

</style>
