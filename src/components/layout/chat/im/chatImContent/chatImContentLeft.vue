<template>
  <Row class="chat-im-record-left">
    <div class="chat-im-record-image">
      <Avatar v-if="img" shape="square" size="default" :src="website.filePath + img" />
      <Avatar v-else shape="square" icon="ios-person" size="default" />
    </div>
    <div class="chat-im-record-content">
      <div class="chat-im-record-user">
        <span class="chat-im-record-user-name">{{name}}</span>
        <span>{{sendDate}}</span>
      </div>

      <div class="chat-im-record-text" v-html="content" ></div>
    </div>
  </Row>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CChatImContentLeft',
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
  .chat-im-record-left{
    margin: 15px;
    .chat-im-record-image{
      float: left;
      height: 40px;
      width: 50px;
    }
    .chat-im-record-content{
      float: left;
      .chat-im-record-user{
        font-size: 14px;
        .chat-im-record-user-name{
          color: #17233d;
          margin-right: 10px;
        }
      }
      .chat-im-record-text{
        float: left;
        font-size: 14px;
        background: #e8eaec;
        padding: 10px;
        border-radius: 3px;
        margin-top: 5px;
        max-width: 500px;
        img {
          cursor: pointer;
          max-height: 200px;
          max-width: 200px;
        }
        a {
          color: #1296db;
          div {
            min-width: 50px;
            height: 50px;
            background-image: url(/static/assets/images/message/chat-file-left.png);
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
        left: 40px;
        top: 40px;
        width: 0;
        height: 0;
        border-style: solid dashed dashed;
        border-color: #e8eaec transparent transparent;
        overflow: hidden;
        border-width: 10px;
      }
    }
  }
</style>
