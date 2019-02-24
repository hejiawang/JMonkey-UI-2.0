<template>
  <Layout v-layoutIn class="app-ms-chat-group">
    <Row style="height: 60px;">
      <Button type="primary" @click="raiseHandle">新增</Button>
    </Row>
    <Row :style="heightStyle" :gutter="32">
      <Col span="6" class="group-content-col">
        <Card>
          <div class="group-content">
            <Row class="group-info">
              <Col span="6">
                <Avatar shape="square" icon="ios-people" size="default"/>
              </Col>
              <Col span="18">
                <Row class="group-name">
                  <span class="name">第不知道几次会议交流</span>
                </Row>
                <Row class="group-other">
                  <Col span="12"><span>超级管理员</span></Col>
                  <Col span="12"><span>2019-01-01</span></Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Divider>群组成员</Divider>
            </Row>

            <Row>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">超级管理元</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">藏三大</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">私立</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">私立</span> </Row>
              </Col>
            </Row>

            <Row class="group-user-more">
              <Icon type="ios-more" size="30" color="#ff9900"/>
            </Row>
          </div>
        </Card>
      </Col>

      <Col span="6" class="group-content-col">
        <Card>
          <div class="group-content">
            <Row class="group-info">
              <Col span="6">
                <Avatar shape="square" icon="ios-people" size="default"/>
              </Col>
              <Col span="18">
                <Row class="group-name">
                  <span class="name">第不知道几次会议交流</span>
                </Row>
                <Row class="group-other">
                  <Col span="12"><span>超级管理员</span></Col>
                  <Col span="12"><span>2019-01-01</span></Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Divider>群组成员</Divider>
            </Row>

            <Row>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">超级管理元</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">藏三大</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">私立</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">私立</span> </Row>
              </Col>
            </Row>

            <Row class="group-user-more">
              <Icon type="ios-more" size="30" color="#ff9900"/>
            </Row>
          </div>
        </Card>
      </Col>
      <Col span="6" class="group-content-col">
        <Card>
          <div class="group-content">
            <Row class="group-info">
              <Col span="6">
                <Avatar shape="square" icon="ios-people" size="default"/>
              </Col>
              <Col span="18">
                <Row class="group-name">
                  <span class="name">第不知道几次会议交流</span>
                </Row>
                <Row class="group-other">
                  <Col span="12"><span>超级管理员</span></Col>
                  <Col span="12"><span>2019-01-01</span></Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Divider>群组成员</Divider>
            </Row>

            <Row>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">超级管理元</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">藏三大</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">私立</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">私立</span> </Row>
              </Col>
            </Row>

            <Row class="group-user-more">
              <Icon type="ios-more" size="30" color="#ff9900"/>
            </Row>
          </div>
        </Card>
      </Col>
      <Col span="6" class="group-content-col">
        <Card>
          <div class="group-content">
            <Row class="group-info">
              <Col span="6">
                <Avatar shape="square" icon="ios-people" size="default"/>
              </Col>
              <Col span="18">
                <Row class="group-name">
                  <span class="name">第不知道几次会议交流</span>
                </Row>
                <Row class="group-other">
                  <Col span="12"><span>超级管理员</span></Col>
                  <Col span="12"><span>2019-01-01</span></Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Divider>群组成员</Divider>
            </Row>

            <Row>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">超级管理元</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">藏三大</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">私立</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">私立</span> </Row>
              </Col>
            </Row>

            <Row class="group-user-more">
              <Icon type="ios-more" size="30" color="#ff9900"/>
            </Row>
          </div>
        </Card>
      </Col>
      <Col span="6" class="group-content-col">
        <Card>
          <div class="group-content">
            <Row class="group-info">
              <Col span="6">
                <Avatar shape="square" icon="ios-people" size="default"/>
              </Col>
              <Col span="18">
                <Row class="group-name">
                  <span class="name">第不知道几次会议交流</span>
                </Row>
                <Row class="group-other">
                  <Col span="12"><span>超级管理员</span></Col>
                  <Col span="12"><span>2019-01-01</span></Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Divider>群组成员</Divider>
            </Row>

            <Row>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">超级管理元</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">藏三大</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">私立</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">私立</span> </Row>
              </Col>
            </Row>

            <Row class="group-user-more">
              <Icon type="ios-more" size="30" color="#ff9900"/>
            </Row>
          </div>
        </Card>
      </Col>
      <Col span="6" class="group-content-col">
        <Card>
          <div class="group-content">
            <Row class="group-info">
              <Col span="6">
                <Avatar shape="square" icon="ios-people" size="default"/>
              </Col>
              <Col span="18">
                <Row class="group-name">
                  <span class="name">第不知道几次会议交流</span>
                </Row>
                <Row class="group-other">
                  <Col span="12"><span>超级管理员</span></Col>
                  <Col span="12"><span>2019-01-01</span></Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Divider>群组成员</Divider>
            </Row>

            <Row>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">超级管理元</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">藏三大</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">私立</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">私立</span> </Row>
              </Col>
            </Row>

            <Row class="group-user-more">
              <Icon type="ios-more" size="30" color="#ff9900"/>
            </Row>
          </div>
        </Card>
      </Col>
      <Col span="6" class="group-content-col">
        <Card>
          <div class="group-content">
            <Row class="group-info">
              <Col span="6">
                <Avatar shape="square" icon="ios-people" size="default"/>
              </Col>
              <Col span="18">
                <Row class="group-name">
                  <span class="name">第不知道几次会议交流</span>
                </Row>
                <Row class="group-other">
                  <Col span="12"><span>超级管理员</span></Col>
                  <Col span="12"><span>2019-01-01</span></Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Divider>群组成员</Divider>
            </Row>

            <Row>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">超级管理元</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">藏三大</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">私立</span> </Row>
              </Col>
              <Col span="6" class="group-user">
                <Row> <Avatar shape="square" icon="ios-people" size="default"/> </Row>
                <Row> <span class="group-user-name">私立</span> </Row>
              </Col>
            </Row>

            <Row class="group-user-more">
              <Icon type="ios-more" size="30" color="#ff9900"/>
            </Row>
          </div>
        </Card>
      </Col>
    </Row>
    <Row>
      <CPage v-model="listQuery" @on-list="initGroupList" ref="messagePage" :sizeOpts="sizeOpts"/>
    </Row>
  </Layout>
</template>
<script>
import store from '@/store'

export default {
  name: 'MessageChatGroup',
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
      listQuery: {
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

    },
    raiseHandle () {

    }
  }
}
</script>
<style lang="scss">
  .app-ms-chat-group {
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
  }
</style>
