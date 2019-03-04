<template>
  <Row class="chat-im-record-right">
    <div class="chat-im-record-image">
      <Avatar v-if="img" shape="square" size="default" :src="website.filePath + img" />
      <Avatar v-else shape="square" icon="ios-person" size="default" />
    </div>
    <div class="chat-im-record-content">
      <div class="chat-im-record-user">
        <span class="chat-im-record-user-name">{{name}}</span>
        <span>{{sendDate}}</span>
      </div>

      <div class="chat-im-record-text" v-html="content" > </div>
    </div>
  </Row>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CChatImContentRight',
  computed: {
    ...mapGetters(['website'])
  },
  props: {
    name: {type: String, default: '', required: true},
    img: {type: String, default: '', required: true},
    sendDate: {type: String, default: '', required: true},
    content: {type: String, default: '', required: true}
  }
}
</script>
<style lang="scss">
  .chat-im-record-right{
    margin: 15px;
    .chat-im-record-image{
      float: right;
      height: 40px;
      width: 50px;
      span{
        float: right;
      }
    }
    .chat-im-record-content{
      float: right;
      .chat-im-record-user{
        height: 21px;
        font-size: 14px;
        span{
          float: right;

        }
        .chat-im-record-user-name{
          color: #17233d;
          margin-left: 10px;
        }
      }
      .chat-im-record-text{
        float: right;
        color: white;
        font-size: 14px;
        background: #19be6b;
        padding: 10px;
        border-radius: 3px;
        margin-top: 5px;
        max-width: 500px;
        word-wrap: break-word;
        img {
          cursor: pointer;
          max-height: 200px;
          max-width: 200px;
        }
        a {
          color: white;
          div {
            min-width: 50px;
            height: 50px;
            background-image: url(/static/assets/images/message/chat-file-right.png);
            background-size: 50px 50px;
            background-repeat:no-repeat;
            background-position: center;
            margin-bottom: 5px;
          }
        }
      }
      .chat-im-record-text:after {
        content: '';
        position: absolute;
        right: 40px;
        top: 40px;
        width: 0;
        height: 0;
        border-style: solid dashed dashed;
        border-color: #19be6b transparent transparent;
        overflow: hidden;
        border-width: 10px;
      }
    }
  }
</style>
