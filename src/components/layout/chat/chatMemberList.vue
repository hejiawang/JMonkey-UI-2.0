<template>
  <Drawer title="群组成员信息" width="400" v-model="isShow" @on-visible-change="showDrawer">
    <template v-for="(memberDept, index) in memberList">
      <Row :key="index" style="margin-top: 20px;"> <Divider>{{memberDept.name}} ( {{memberDept.userList.length}} )</Divider> </Row>
      <Row :key="index">
        <Col span="6" v-for="member in memberDept.userList" :key="member.id" style="text-align: center">
          <Row>
            <Avatar v-if="member.photo" shape="square" size="default" :src="website.filePath + member.photo" />
            <Avatar v-else shape="square" icon="ios-person" size="default" />
          </Row>
          <Row><span style="color: #c5c8ce;">{{member.realName}}</span></Row>
        </Col>
      </Row>
    </template>
  </Drawer>
</template>
<script>
import { deptUserList } from '@/api/message/chatGroupMember'
import { mapGetters } from 'vuex'

export default {
  name: 'CChatMemberList',
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  props: {
    value: {type: Boolean, default: false, required: true},
    groupId: {type: String, default: '', required: true}
  },
  computed: {
    ...mapGetters(['website'])
  },
  data () {
    return {
      isShow: false,
      memberList: []
    }
  },
  methods: {
    showDrawer (isOpen) {
      if (isOpen) {
        deptUserList(this.groupId).then(data => {
          this.memberList = data.result
        })
      }
    }
  }
}
</script>
