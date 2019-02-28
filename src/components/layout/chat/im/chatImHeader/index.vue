<template>
  <div class="app-chat-im-header">
    <template v-if="memberC.type === 'Group'">
      <Avatar v-if="memberC.img" shape="square" size="default" :src="website.filePath + memberC.img" />
      <Avatar v-else shape="square" icon="ios-people" size="default" style="background-color: #5cadff"/>
    </template>
    <template v-else>
      <Avatar v-if="memberC.img" shape="square" size="default" :src="website.filePath + memberC.img" />
      <Avatar v-else shape="square" icon="ios-person" size="default" />
    </template>

    <span class="member">{{memberC.name}}</span>
    <Icon type="ios-people" size="25" color="#19be6b"
          v-if="memberC.type === 'Group'" class="member-list" @click="showGroupMember"/>

    <CChatMemberList v-model="isShow" :groupId="memberC.id" :groupName="memberC.name"/>
  </div>
</template>
<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import CChatMemberList from '@/components/layout/chat/member/chatMemberList'

export default {
  name: 'CChatImHeader',
  components: { CChatMemberList },
  computed: {
    ...mapGetters(['website']),
    /**
     * 当前聊天的人
     */
    memberC () {
      return store.getters.memberC
    }
  },
  watch: {
    /**
     * 当前选中的聊天人不是群组时, 一定要关闭群组成员list
     * @param val
     */
    memberC (val) {
      if (val.type !== 'Group') this.isShow = false
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    showGroupMember () {
      this.isShow = true
    }
  }
}
</script>
<style lang="scss">
  .app-chat-im-header{
    height: 35px;
    line-height: 35px;
    .member {
      margin: 0px 10px;
      font-size: 20px;
      color: #17233d;
      display: inline-block;
      text-align: center;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
      vertical-align: middle;
      height: 32px;
    }
    .member-list{
      cursor: pointer;
    }
  }
</style>
