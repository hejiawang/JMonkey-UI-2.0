<template>
  <div>
    <Spin size="large" fix v-if="loading"/>
    <div class="chat-mian-content-group">
      <div class="chat-group-info" v-for="(group, index) in groupList" :key="index">
        <div class="chat-group-left" @click="handleIM">
          <div class="chat-group-img">
            <Avatar v-if="group.img" shape="square" size="default" :src="website.filePath + group.img" />
            <Avatar v-else shape="square" icon="ios-people" size="default" />
          </div>
          <div class="chat-group-name"> {{group.name}} </div>
          <div class="chat-group-creator"> <span>创建人: {{group.creatorName}}</span> </div>
        </div>

        <div class="chat-group-right">
          <template v-if="group.creator === userId">
            <Row style="line-height: 30px;">
              <Icon type="ios-trash-outline" size="17" @click="handleDelete(group)"/>
            </Row>
            <Row style="line-height: 30px;">
              <Icon type="ios-build" size="17" @click="handleIMSetting(group)"/>
            </Row>
          </template>
          <template v-else>
            <Row style="line-height: 50px;">
              <Icon type="ios-trash-outline" size="17" @click="handleIMOut(group)"/>
            </Row>
          </template>
        </div>
      </div>
    </div>

    <CChatGroup v-model="showGroup" :cGroup="cGroup" @refresh="initGroupList"/>

  </div>
</template>
<script>
import { list, del } from '@/api/message/chatGroup'
import { outGroup } from '@/api/message/chatGroupMember'
import { mapGetters } from 'vuex'
import store from '@/store'
import CChatGroup from '@/components/layout/chat/group/chatGroup'

export default {
  name: 'CChatMainGroup',
  components: { CChatGroup },
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
      loading: false,
      showGroup: false,
      cGroup: null,
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
      this.loading = true
      list().then(data => {
        this.groupList = data.result
        this.loading = false
      })
    },
    handleIM () {

    },
    /**
     * 删除群组信息
     * @param group 群组信息
     */
    handleDelete (group) {
      this.$CDelete({
        'content': '<p>该群组将被删除是否继续？</p>',
        'confirm': () => {
          del(group.id).then(() => {
            this.$Message.success('删除成功')
            this.initGroupList()
          })
        }
      })
    },
    handleIMSetting (group) {
      this.cGroup = group; this.showGroup = true
    },
    /**
     * 退出群组
     * @param group 群组信息
     */
    handleIMOut (group) {
      this.$CSure({
        'content': '退出该群组？',
        'confirm': () => {
          outGroup(group.id, this.userId).then((data) => {
            this.$Message.success('退出成功')
            this.initGroupList()
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .chat-mian-content-group {
    .chat-group-info {
      cursor:pointer;
      height: 60px;
      margin-bottom: 10px;
      .chat-group-left{
        height: 60px;
        float: left;
        width: 230px;
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
          width: 180px;
          font-size: 17px;
          line-height: 40px;
          a{
            color: #17233d;
          }
          a:hover {
            color: #5cadff;
          }
        }

        .chat-group-creator{
          margin-left: 10px;
          color: #808695;
          float: left;
          width: 180px;
          height: 30px;
          font-size: 14px;
          line-height: 30px;
        }
      }

      .chat-group-right{
        height: 60px;
        float: right;
        margin-right: 10px;
        display: none;
        .ivu-icon:hover {
          color: #ff9900;
        }
      }
    }
    .chat-group-info:hover {
      background: #e8eaec;
    }
    .chat-group-info:hover .chat-group-right{
      background: #e8eaec;
      display: block;
    }
  }
</style>
