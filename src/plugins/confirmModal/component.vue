<template>
  <Modal v-model="isShow" width="360" :styles="{'top':'30%'}" class="confirm-modal">
    <div class="confirm-modal-content" >
      <Row>
        <Col span="6"><Icon type="md-warning" size="50" color="#19be6b"/></Col>
        <Col span="18">
          <span style="line-height: 50px;">{{content}}</span>
        </Col>
      </Row>
    </div>
    <div slot="footer">
      <Row>
        <Col span="12"><Button type="info" long @click="noHandle" class="confirm-modal-button">{{noTitle}}</Button></Col>
        <Col span="12"><Button type="warning" long @click="yesHandle" class="confirm-modal-button">{{yesTitle}}</Button></Col>
      </Row>
    </div>
  </Modal>
</template>
<script>
export default {
  name: 'CConfirm',
  props: {
    isShow: { type: Boolean, default: false },
    content: { type: String, default: '<p>是否继续操作？</p>' },
    yesTitle: { type: String, default: '通过' },
    noTitle: { type: String, default: '拒绝' }
  },
  methods: {
    yesHandle () { },
    noHandle () { }
  }
}
</script>
<style lang="scss">
  .confirm-modal{
    .ivu-modal-body{
      padding: 40px 20px 20px 20px;
    }
    .confirm-modal-content{
      text-align: left;
      font-size: 17px;
    }
    .confirm-modal-button{
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
