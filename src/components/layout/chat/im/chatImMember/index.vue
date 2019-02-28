<template>
  <div>
    <Col :span="mainSpan" class="app-chat-im-main-left" v-if="mainSpan !== 0">
      <div class="member-info" v-for="(member, index) in memberList" :key="index" :style="memberInfoB(member)">
        <div @click="selectMember(member)" class="member-select">
          <template v-if="member.type === 'Group'">
            <Avatar v-if="member.img" shape="square" size="default" :src="website.filePath + member.img" />
            <Avatar v-else shape="square" icon="ios-person" size="default" style="background-color: #5cadff"/>
          </template>
          <template v-else>
            <Avatar v-if="member.img" shape="square" size="default" :src="website.filePath + member.img" />
            <Avatar v-else shape="square" icon="ios-person" size="default" />
          </template>

          <span class="member-name"> {{member.name}} </span>
        </div>
        <Icon type="md-close" size="20" color="#ff9900" class="member-close" @click="closeMember(member)"/>
      </div>
    </Col>
  </div>
</template>
<script>
import store from '@/store'
import { mapGetters } from 'vuex'

export default {
  name: 'CChatImMember',
  computed: {
    ...mapGetters(['website']),
    /**
     * memberList
     */
    memberList () { return store.getters.memberList },
    /**
     * 当前聊天的人
     */
    memberC () { return store.getters.memberC },
    /**
     * 选中的聊天人背景色
     * @param member
     * @returns {Function}
     */
    memberInfoB (member) {
      return function (member) {
        if (member.id === store.getters.memberC.id) return 'background: #F3F3F3;'
        else return ''
      }
    },
    /**
     * main-left col span
     * @returns {number}
     */
    mainSpan () {
      if (store.getters.memberList.length > 1) return 5
      else return 0
    }
  },
  methods: {
    selectMember (member) {
      store.commit('SET_MEMBERC', member)
    },
    closeMember (member) {
      store.dispatch('closeChatImMember', member)
    }
  }
}
</script>
<style lang="scss">
  .app-chat-im-main-left{
    height: 500px;
    overflow-y: auto;
    background: #dcdee2;
    .member-info{
      cursor:pointer;
      padding: 8px 0px 8px 10px;
      line-height: 32px;
      font-size: 15px;
      height: 48px;
      .member-select{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 130px;
        float: left;
        height: 32px;
      }
      .member-name{
        margin-left: 5px
      }
    }
    .member-close {
      float: right;
      line-height: 32px;
      margin-right: 5px;
      display: none;
    }
    .member-info:hover {
      background: #e8eaec;
    }
    .member-info:hover .member-close{
      display: block;
    }
  }
</style>
