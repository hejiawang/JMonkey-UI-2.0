<template>
  <div>
    <Collapse simple class="chat-mian-content-single">
      <Panel name="1">
        技术部 <span>(1)</span>
        <div slot="content">
          <div class="chat-user-info">
            <Avatar shape="square" icon="ios-person" size="default" />
            <span class="chat-user-info-name">超级管理员</span>
          </div>
          <div class="chat-user-info">
            <Avatar shape="square" icon="ios-person" size="default" />
            <span class="chat-user-info-name">办案好几十</span>
          </div>
          <div class="chat-user-info">
            <Avatar shape="square" icon="ios-person" size="default" />
            <span class="chat-user-info-name">张三</span>
          </div>
        </div>
      </Panel>
      <Panel name="2">
        研发部 <span>(0)</span>
        <div slot="content">
          <div class="chat-user-none">
            <span>该部门暂无人员</span>
          </div>
        </div>
      </Panel>
      <Panel name="3">
        开发部 <span>(0)</span>
        <div slot="content">
          <div class="chat-user-none">
            <span>该部门暂无人员</span>
          </div>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
export default {
  name: 'CChatMainSingle'
}
</script>
<style lang="scss">
  .chat-mian-content-single {
    border: 0px;

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
