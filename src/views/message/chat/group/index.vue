<template>
  <Layout v-layoutIn class="app-ms-chat-group">
    <Row style="height: 60px;">
      <Form ref="searchForm" :model="listQuery" :label-width="80" inline>
        <FormItem label="群组名称">
          <Input type="text" v-model="listQuery.name" style="width: 320px;"/>
        </FormItem>

        <FormItem :label-width="0">
          <ButtonGroup>
            <Button icon="ios-search" @click="search" />
            <Button icon="ios-trash-outline" @click="restSearch" />
          </ButtonGroup>
        </FormItem>
      </Form>
    </Row>
    <Row :style="heightStyle" :gutter="32">
      <Spin size="large" fix v-if="loading"/>
      <CChatGroupCard :groupTableData="groupTableData" v-else/>
    </Row>
    <Row>
      <CPage v-model="listQuery" @on-list="initGroupList" ref="groupPage" :sizeOpts="sizeOpts"/>
    </Row>
  </Layout>
</template>
<script>
import store from '@/store'
import { pageList } from '@/api/message/chatGroup'
import CChatGroupCard from '@/views/message/chat/group/groupCard'

export default {
  name: 'MessageChatGroup',
  components: {
    CChatGroupCard
  },
  computed: {
    /**
     * 卡片区域高度
     * @returns {string}
     */
    heightStyle () {
      return 'height: ' + (store.getters.windowHeight - 290) + 'px; overflow-y: auto;'
    }
  },
  data () {
    return {
      loading: false,
      listQuery: {
        name: null,
        current: 1,
        size: 8,
        total: 10
      },
      sizeOpts: [8, 16, 24],
      groupTableData: [ ]
    }
  },
  created () {
    this.initGroupList()
  },
  methods: {
    initGroupList () {
      this.loading = true
      pageList(this.listQuery).then(data => {
        this.groupTableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})

        this.loading = false
      })
    },
    /**
     * search
     */
    search () {
      this.$refs.groupPage.rest()
      this.initGroupList()
    },
    /**
     * rest seach
     */
    restSearch () {
      ['name'].forEach(param => (
        this.listQuery[param] = null
      ))
      this.search()
    }
  }
}
</script>
