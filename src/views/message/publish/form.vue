<template>
  <Layout v-layoutIn class="message-publish-form">
    <Row :gutter="32">
      <Col span="20"><Alert show-icon>消 息 发 布</Alert></Col>
      <Col span="2"><Button long type="info" icon="ios-undo" @click="goBack">取 消</Button></Col>
      <Col span="2"><Button long type="success" icon="ios-chatbubbles-outline">发 布</Button></Col>
    </Row>

    <Row :gutter="32" style="height: calc(100% - 50px);" id="anchor_container">
      <Col span="18" style="height: 100%">
        <Row style="overflow-y: auto; overflow-x: hidden; height: 100%" >
          <Form ref="messageForm" :model="messageForm" :rules="messageRules" :label-width="120" style="height: 100%">
            <Row id="publish_main">
              <Divider style="color: #E46CBB">发 布 信 息</Divider>
              <FormItem label="消息标题" prop="title">
                <Input type="text" v-model.trim="messageForm.title"/>
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
              <quillEditor ref="myTextEditor"
                            v-model="messageForm.content"
                            :config="editorOption" />
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
          <Upload
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点 击 或 拖 拽 上 传 附 件 </p>
            </div>
          </Upload>
        </Row>
      </Col>
    </Row>
  </Layout>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'MessagePublishForm',
  components: {
    quillEditor
  },
  data () {
    return {
      editorOption: {},
      messageForm: {
        title: null,
        audit: null,
        rate: 5,
        content: ''
      },
      messageRules: {}
    }
  },
  methods: {
    goBack () {
      this.$router.replace({path: '/message/publish'})
    }
  }
}
</script>
<style lang="scss">
  .message-publish-form{
    .quill-editor{
      height: calc(100% - 130px);
    }
  }
</style>
