<template>
  <Layout v-layoutIn class="message-publish-form">
    <Row :gutter="32">
      <Col span="20"><Alert show-icon>消 息 发 布</Alert></Col>
      <Col span="2"><Button long type="info" icon="ios-undo" @click="goBack">取 消</Button></Col>
      <Col span="2">
        <Button long type="success" icon="ios-chatbubbles-outline" @click="publishHandle">发 布</Button>
      </Col>
    </Row>

    <Row :gutter="32" style="height: calc(100% - 50px);" id="anchor_container">
      <Col span="18" style="height: 100%">
        <Row style="overflow-y: auto; overflow-x: hidden; height: 100%" >
          <Form ref="messageForm" :model="messageForm" :label-width="120" style="height: 100%">
            <Row id="publish_main">
              <Row><Divider style="color: #E46CBB">发 布 信 息</Divider></Row>
              <FormItem label="消息标题" prop="title"
                        :rules="{required: true, message: '请填写消息标题', trigger: 'blur'}">
                <Input type="text" v-model.trim="messageForm.title" :maxlength="100" :autofocus="true"/>
              </FormItem>
              <Row :gutter="32">
                <Col span="14">
                  <FormItem label="审核人员" prop="audit">
                    <CUser v-model="messageForm.audit" title="选择审核人员"/>
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
              <Row><Divider style="color: #E46CBB">发 布 内 容</Divider></Row>
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
          <Row><Divider style="color: #E46CBB">消 息 附 件</Divider></Row>
          <CMsFile v-model="messageForm.fileList"/>
        </Row>
      </Col>
    </Row>
  </Layout>
</template>
<script>
import CMsEditor from '@/views/message/publish/formEditor'
import CMsFile from '@/views/message/publish/formFile'
import { save, find, modify } from '@/api/message/message'
import CUser from '@/components/sys/user'

export default {
  name: 'MessagePublishForm',
  components: {
    CMsEditor, CMsFile, CUser
  },
  computed: {
    /**
     * 是否是修改消息 true 是
     */
    isModify () {
      return !this.$CV.isEmpty(this.$route.query.messageId)
    }
  },
  data () {
    return {
      messageForm: {
        title: null,
        audit: null,
        rate: 5,
        content: '',
        fileList: []
      }
    }
  },
  created () {
    this.initMessage()
  },
  methods: {
    /**
     * init message info
     */
    initMessage () {
      if (this.isModify) {
        find(this.$route.query.messageId).then(data => {
          this.messageForm = data.result
          this.messageForm.rate = parseInt(data.result.rate)

          // 重新赋值, 使选择用户组件watch到变化
          this.messageForm.audit = data.result.audit
        })
      }
    },
    /**
     * 放弃编辑内容,返回消息发布列表页
     */
    goBack () {
      this.$CSure({
        'content': '放弃本次编辑内容？',
        'confirm': () => { this.$router.replace({path: '/message/publish'}) }
      })
    },
    /**
     * 发布消息,成功后返回消息发布列表页
     */
    publishHandle () {
      this.$refs.messageForm.validate((valid) => {
        if (valid) {
          if (this.isModify) this.modifyhandle()
          else this.savehandle()
        }
      })
    },
    /**
     * 发布消息
     */
    savehandle () {
      this.$CSure({
        'content': '已检查无误, 准备发布？',
        'confirm': () => {
          save(this.messageForm).then(data => {
            if (data.isSuccess) {
              this.$Message.success('发布成功')
              this.$router.replace({path: '/message/publish'})
            }
          })
        }
      })
    },
    /**
     * 修改后发布消息
     */
    modifyhandle () {
      this.$CSure({
        'content': '已修改完毕, 准备发布？',
        'confirm': () => {
          modify(this.messageForm).then(data => {
            if (data.isSuccess) {
              this.$Message.success('发布成功')
              this.$router.replace({path: '/message/publish'})
            }
          })
        }
      })
    }
  }
}
</script>
