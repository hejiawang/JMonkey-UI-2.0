<template>
  <div v-if="groupTableData.length > 0">
    <Col span="6" class="group-content-col" v-for="group in groupTableData" :key="group.id">
      <Card>
        <div class="group-content">
          <Row class="group-info">
            <Col span="6">
              <Avatar v-if="group.img" shape="square" size="default" :src="website.filePath + group.img" />
              <Avatar v-else shape="square" icon="ios-people" size="default"/>
            </Col>
            <Col span="18">
              <Row class="group-name">
                <span class="name">{{group.name}}</span>
              </Row>
              <Row class="group-other">
                <Col span="12"><span>{{group.creatorName}}</span></Col>
                <Col span="12"><span>{{group.createDate | createDateFilter}}</span></Col>
              </Row>
            </Col>
          </Row>

          <Row> <Divider>群组成员 ( {{group.memberList.length}} )</Divider> </Row>

          <Row>
            <Col span="6" class="group-user" v-for="(member, index) in group.memberList" :key="index" v-if="index < 4">
              <Row>
                <Avatar v-if="member.photo" shape="square" size="default" :src="website.filePath + member.photo" />
                <Avatar v-else shape="square" icon="ios-person" size="default" />
              </Row>
              <Row> <span class="group-user-name">{{member.realName}}</span> </Row>
            </Col>
          </Row>

          <Row class="group-user-more">
            <Icon type="ios-more" size="30" color="#ff9900"
                  v-if="group.memberList.length > 4" @click="showMemberList(group.id)"/>
          </Row>
        </div>
      </Card>
    </Col>

    <CChatMemberList v-model="isShow" :groupId="cGroupId"/>
  </div>

  <div v-else style="text-align: center; line-height: 200px;font-size: 20px; color: #c5c8ce;">
    <span >暂无群组信息</span>
  </div>
</template>
<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import CChatMemberList from '@/components/layout/chat/chatMemberList'

export default {
  name: 'ChatGroupCard',
  components: { CChatMemberList },
  props: {
    groupTableData: {
      type: Array,
      default: () => ([]),
      required: true
    }
  },
  filters: {
    createDateFilter (val) {
      return moment(val).format('YYYY-MM-DD')
    }
  },
  computed: {
    ...mapGetters(['website'])
  },
  data () {
    return {
      isShow: false,
      cGroupId: ''
    }
  },
  methods: {
    showMemberList (id) {
      this.cGroupId = id; this.isShow = true
    }
  }
}
</script>
<style lang="scss">
  .group-content-col{
    margin-bottom: 20px;

    .group-content {
      .group-info{
        .ivu-avatar {
          width: 60px;
          height: 60px;
          font-size: 40px;
          line-height: 60px;
          background: #5cadff;
        }
        .group-name {
          height: 30px;
          line-height: 30px;
          color: #17233d;
          font-size: 20px;
        }
        .group-other {
          height: 30px;
          line-height: 30px;
          color: #c5c8ce;
          font-size: 14px;
        }
      }
      .group-user{
        text-align: center;
        .group-user-name {
          font-size: 12px;
          color: #c5c8ce;
        }
      }
      .group-user-more {
        height: 30px;
        margin-top: 5px;
        text-align: center;
        .ivu-row{
          height: 57px;
          line-height: 57px;
        }
        .ivu-icon {
          cursor: pointer;
        }
      }
    }
  }
</style>
