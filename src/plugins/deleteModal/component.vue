<template>
  <Modal v-model="isShow" width="360" :styles="{'top':'30%'}" class="delete-modal">
    <p slot="header" style="color:#f60;text-align:center;font-size: 17px;">
      <Icon type="ios-trash" />
      <span>{{title}}</span>
    </p>
    <div class="delete-modal-content" v-html="content"></div>
    <div slot="footer">
      <Button type="error" long @click="del" class="delete-modal-button">删 除</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  name: 'CDelete',
  props: {
    isShow: { type: Boolean, default: false },
    title: { type: String, default: '删除确认' },
    content: { type: String, default: '<p>您将删除该条数据，是否继续？</p>' }
  },
  methods: {
    del () { }
  }
}
</script>
<style lang="scss">
  .delete-modal{
    .ivu-modal-body{
      padding: 20px;
    }
    .delete-modal-content{
      text-align:center;
      font-size: 17px
    }
    .delete-modal-button{
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
