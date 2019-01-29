<template>
  <Modal v-model="isShow" width="360" :styles="{'top':'30%'}" class="sure-modal">
    <div class="sure-modal-content" >
      <Row>
        <Col span="6"><Icon type="ios-bulb-outline" size="50" color="#19be6b"/></Col>
        <Col span="18">
          <span style="line-height: 50px;">{{content}}</span>
        </Col>
      </Row>
    </div>
    <div slot="footer">
      <Button type="info" long @click="handle" class="sure-modal-button">确 定</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  name: 'CSure',
  props: {
    isShow: { type: Boolean, default: false },
    content: { type: String, default: '<p>是否继续操作？</p>' }
  },
  methods: {
    handle () { }
  }
}
</script>
<style lang="scss">
  .sure-modal{
    .ivu-modal-body{
      padding: 40px 20px 20px 20px;
    }
    .sure-modal-content{
      text-align: left;
      font-size: 17px;
    }
    .sure-modal-button{
      font-size: 17px;
      border-radius: 0px;
      span{
        letter-spacing: 20px !important;
        margin-left: 25px !important;
      }
    }
    .ivu-modal-footer{
      border-top: 0px solid #e8eaec;
      padding: 0px;
    }
  }
</style>
