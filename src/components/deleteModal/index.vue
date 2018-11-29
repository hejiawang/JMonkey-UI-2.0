<template>
  <Modal v-model="isShow" width="360" :styles="{'top':'30%'}">
    <p slot="header" style="color:#f60;text-align:center; font-size: 17px">
      <Icon type="ios-trash" />
      <span>{{title}}</span>
    </p>
    <div style="text-align:center; font-size: 17px" v-html="content"></div>
    <div slot="footer">
      <Button type="error" long @click="del">删除</Button>
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
