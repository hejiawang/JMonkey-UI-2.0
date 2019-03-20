<template>
  <Layout v-layoutIn class="app-sys-dataScope">
    <Row :gutter="32" class="dataScope-main">
      <Col span="8" class="dataScope-left">
        <Row class="dataScope-left-event">
          <ButtonGroup >
            <Button type="primary" icon="ios-add-circle-outline"> 新增 </Button>
            <Button type="warning" icon="ios-brush-outline"> 修改 </Button>
            <Button type="error" icon="ios-trash-outline"> 删除 </Button>
          </ButtonGroup>
        </Row>
        <Row class="dataScope-left-content">
          <div class="dataScope-left-info">
            <p class="dataScope-left-name">系统设置——用户列表</p>
            <p class="dataScope-left-url">/sys/user/list</p>

            <div class="dataScope-left-select">
              <Icon type="md-checkmark" size="30" color="#19be6b"/>
            </div>
          </div>

          <div class="dataScope-left-info">
            <p class="dataScope-left-name">系统设置——用户列表</p>
            <p class="dataScope-left-url">/sys/user/list</p>

            <div class="dataScope-left-select">
              <Icon type="md-checkmark" size="30" color="#19be6b"/>
            </div>
          </div>
        </Row>

        <CPage v-model="listQuery" @on-list="initList" ref="dataScopePage"/>
      </Col>
      <Col span="16" class="dataScope-right">

      </Col>
    </Row>
  </Layout>
</template>
<script>
export default {
  name: 'SysDataScope',
  data () {
    return {
      listQuery: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  methods: {
    initList () {}
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
          }

          .dataScope-left-info:hover .dataScope-left-select{
            display: block;
          }
        }
      }
      .dataScope-right {

      }
    }
  }

</style>
