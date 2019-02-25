<template>
  <div>
    <div class="chat-mian-content-group">
      <div class="chat-group-info" v-for="(group, index) in groupList" :key="index">
        <div class="chat-group-img">
          <Avatar v-if="group.img" shape="square" size="default" :src="website.filePath + group.img" />
          <Avatar v-else shape="square" icon="ios-people" size="default" />
        </div>
        <div class="chat-group-name">
          <a href="#" @click="handleIM">{{group.name}}</a>
        </div>
        <div class="chat-group-option">
          <span>创建人: </span>
          <span> {{group.creatorName}} </span>

          <template v-if="group.creator === userId">
            <Icon type="ios-trash-outline" size="17" @click="handleIMClear"/>
            <Icon type="ios-build" size="17" @click="handleIMSetting"/>
          </template>
          <template v-else>
            <Icon type="ios-trash-outline" size="17" @click="handleIMOut"/>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { list } from '@/api/message/chatGroup'
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  name: 'CChatMainGroup',
  computed: {
    ...mapGetters(['website']),
    /**
     * current user id
     */
    userId () {
      return store.getters.user.id
    }
  },
  data () {
    return {
      groupList: []
    }
  },
  created () {
    this.initGroupList()
  },
  methods: {
    /**
     * init deptUserList
     */
    initGroupList () {
      list().then(data => {
        this.groupList = data.result
      })
    },
    handleIM () {
      console.info('handleIM')
    },
    handleIMClear () {
      console.info('handleIMClear')
    },
    handleIMSetting () {
      console.info('handleIMSetting')
    },
    handleIMOut () {
      console.info('handleIMOut')
    }
  }
}
</script>
<style lang="scss">
  .chat-mian-content-group {
    .chat-group-info {
      height: 60px;
      margin-bottom: 10px;
      .chat-group-img {
        float: left;
        line-height: 60px;
        .ivu-avatar {
          width: 40px;
          height: 40px;
          font-size: 30px;
          line-height: 40px;
          background: #5cadff;
        }
      }

      .chat-group-name{
        margin-left: 10px;
        height: 30px;
        float: left;
        width: 200px;
        font-size: 17px;
        line-height: 40px;
        a{
          color: #17233d;
        }
        a:hover {
          color: #5cadff;
        }
      }

      .chat-group-option{
        margin-left: 10px;
        color: #808695;
        float: left;
        width: 200px;
        height: 30px;
        font-size: 14px;
        line-height: 30px;
        .ivu-icon {
          float: right;
          line-height: 30px;
          margin-left: 10px;
          cursor:pointer;
        }
        .ivu-icon:hover {
          color: #ff9900;
        }
      }
    }
    .chat-group-info:hover {
      background: #e8eaec;
    }
  }
</style>
