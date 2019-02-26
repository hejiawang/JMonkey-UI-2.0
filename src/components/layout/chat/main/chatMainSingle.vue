<template>
  <div>
    <Spin size="large" fix v-if="loading"/>
    <Collapse simple class="chat-mian-content-single">
      <Panel v-for="(deptUser, index) in deptUserList" :key="index" :name="deptUser.name">
        {{deptUser.name}} <span>( {{deptUser.userList.length}} )</span>
        <div slot="content">
          <div class="chat-user-none" v-if="deptUser.userList.length <= 0">
            <span>该部门暂无人员</span>
          </div>

          <div class="chat-user-info" v-else v-for="(user, i) in deptUser.userList" :key="i">
            <Avatar v-if="user.photo" shape="square" size="default" :src="website.filePath + user.photo" />
            <Avatar v-else shape="square" icon="ios-person" size="default" />

            <span class="chat-user-info-name">{{user.realName}}</span>
          </div>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
import { deptUserList } from '@/api/sys/dept'
import { mapGetters } from 'vuex'

export default {
  name: 'CChatMainSingle',
  data () {
    return {
      loading: false,
      deptUserList: []
    }
  },
  computed: {
    ...mapGetters(['website'])
  },
  created () {
    this.initDeptUserList()
  },
  methods: {
    /**
     * init deptUserList
     */
    initDeptUserList () {
      this.loading = true
      deptUserList().then(data => {
        this.deptUserList = data.result
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss">
  .chat-mian-content-single {
    border: 0px;
    background: #f8f8f9;
    .ivu-collapse-item {
      border: 0px;
      .ivu-collapse-header {
        margin-right: 10px;
        font-size: 17px;
        padding-left: 0px;
        .ivu-icon {
          margin-right: 5px;
        }
        span {
          color: #c5c8ce;
        }
      }

      .ivu-collapse-content{
        background: #f8f8f9;
        .chat-user-info {
          padding: 0px 15px;
          cursor:pointer;
          height: 40px;
          line-height: 40px;
          .chat-user-info-name {
            margin-left: 10px;
            font-size: 17px;
          }
        }
        .chat-user-info:hover {
          background: #e8eaec;
          color: #17233d;
        }
        .chat-user-none {
          padding: 0px 15px;
          height: 30px;
          line-height: 30px;
          span {
            font-size: 14px;
            color: #c5c8ce;
          }
        }
      }
    }
  }
</style>
