<template>
  <Layout v-layoutIn class="message-publish-form">
    <Row :gutter="32">
      <Col span="20"><Alert show-icon>消 息 发 布</Alert></Col>
      <Col span="2"><Button long type="info" icon="ios-undo" @click="goBack">取 消</Button></Col>
      <Col span="2"><Button long type="success" icon="ios-chatbubbles-outline" @click="publishhandle">发 布</Button></Col>
    </Row>

    <Row :gutter="32" style="height: calc(100% - 50px);" id="anchor_container">
      <Col span="18" style="height: 100%">
        <Row style="overflow-y: auto; overflow-x: hidden; height: 100%" >
          <Form ref="messageForm" :model="messageForm" :rules="messageRules" :label-width="120" style="height: 100%">
            <Row id="publish_main">
              <Divider style="color: #E46CBB">发 布 信 息</Divider>
              <FormItem label="消息标题" prop="title">
                <Input type="text" v-model.trim="messageForm.title" :autofocus="true"/>
              </FormItem>
              <Row :gutter="32">
                <Col span="14">
                  <FormItem label="审核人员" prop="audit">
                    <Input type="text" v-model.trim="messageForm.audit"/>
                  </FormItem>
                </Col>
                <Col span="10">
                  <FormItem label="消息等级" prop="rate">
                    <Rate allow-half v-model="messageForm.rate"/>
                  </FormItem>
                </Col>
              </Row>
            </Row>

            <Row id="publish_content" style="height: calc(100% - 179px);">
              <Divider style="color: #E46CBB">发 布 内 容</Divider>
              <CMsEditor v-model="messageForm.content" />
            </Row>
          </Form>
        </Row>
      </Col>

      <!-- 左侧瞄点信息 -->
      <Col span="6" style="padding-left: 20px;">
        <Row style="height: 178px;">
          <Anchor show-ink :offset-top="0" container="#anchor_container" style="margin-left: 20px; margin-top: 20px;">
            <AnchorLink href="#publish_main" title="发布信息" />
            <AnchorLink href="#publish_content" title="发布内容" />
            <AnchorLink href="#publish_file" title="消息附件" />
          </Anchor>
        </Row>
        <Row id="publish_file">
          <Divider style="color: #E46CBB">消 息 附 件</Divider>
          <CMsFile v-model="messageForm.fileList"/>
        </Row>
      </Col>
    </Row>
  </Layout>
</template>
<script>
import CMsEditor from '@/views/message/publish/formEditor'
import CMsFile from '@/views/message/publish/formFile'

export default {
  name: 'MessagePublishForm',
  components: {
    CMsEditor, CMsFile
  },
  data () {
    return {
      messageForm: {
        title: null,
        audit: null,
        rate: 5,
        content: '',
        fileList: []
      },
      messageRules: {}
    }
  },
  methods: {
    /**
     * 放弃编辑内容,返回消息发布列表页
     */
    goBack () {
      this.$CSure({
        'content': '放弃本次编辑内容？',
        'confirm': () => {
          this.$router.replace({path: '/message/publish'})
        }
      })
    },
    /**
     * 发布消息,成功后返回消息发布列表页
     */
    publishhandle () {
      this.$CSure({
        'content': '已检查无误, 准备发布？',
        'confirm': () => {
          console.info(this.messageForm)

          this.$router.replace({path: '/message/publish'})
        }
      })
    }
  }
}
</script>
