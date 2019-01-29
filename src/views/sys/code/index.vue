<template>
  <Layout v-layoutIn class="app-sys-code">
    <Row>
      <Alert show-icon>
        代码生成
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <template slot="desc">注意： 生成的代码不完全符合框架要求, 记得修改 ！！！</template>
      </Alert>
    </Row>
    <Row style="overflow-y: auto;">
      <Col span="8" offset="8">
        <Form ref="codeForm" :model="codeForm" :rules="codeRules" :label-width="120">
          <FormItem label="模块作者" prop="author">
            <Input type="text" v-model.trim="codeForm.author"/>
          </FormItem>
          <FormItem label="系统名称" prop="name">
            <Input type="text" v-model.trim="codeForm.name"/>
          </FormItem>
          <FormItem label="输出目录" prop="outputDir">
            <Input type="text" v-model.trim="codeForm.outputDir"/>
          </FormItem>
          <FormItem label="数据库表" prop="tableName">
            <Input type="text" v-model.trim="codeForm.tableName"/>
          </FormItem>
          <Divider>数据库连接信息</Divider>
          <FormItem label="IP" prop="dbIp">
            <Input type="text" v-model.trim="codeForm.dbIp"/>
          </FormItem>
          <FormItem label="Post" prop="dbPost">
            <Input type="text" v-model.trim="codeForm.dbPost"/>
          </FormItem>
          <FormItem label="DataBase" prop="dbTable">
            <Input type="text" v-model.trim="codeForm.dbTable"/>
          </FormItem>
          <FormItem label="用户名称" prop="dbName">
            <Input type="text" v-model.trim="codeForm.dbName"/>
          </FormItem>
          <FormItem label="登陆密码" prop="dbPassword">
            <Input type="text" v-model.trim="codeForm.dbPassword"/>
          </FormItem>
        </Form>

        <Button type="info" long @click="handle" >确 定</Button>
      </Col>
    </Row>
  </Layout>
</template>
<script>
import { generator } from '@/api/sys/code'

export default {
  name: 'SysCode',
  data () {
    return {
      codeForm: {
        author: null,
        name: 'sys',
        tableName: null,
        outputDir: 'D:/WorkSpace/JMonkey2.0/src/main/java',
        dbIp: 'localhost',
        dbPost: '3306',
        dbTable: 'j_monkey',
        dbName: 'root',
        dbPassword: '123456'
      },
      codeRules: {
        author: {required: true, message: '必填', trigger: 'blur'},
        name: {required: true, message: '必填', trigger: 'blur'},
        tableName: {required: true, message: '必填', trigger: 'blur'},
        outputDir: {required: true, message: '必填', trigger: 'blur'},
        dbIp: {required: true, message: '必填', trigger: 'blur'},
        dbPost: {required: true, message: '必填', trigger: 'blur'},
        dbTable: {required: true, message: '必填', trigger: 'blur'},
        dbName: {required: true, message: '必填', trigger: 'blur'},
        dbPassword: {required: true, message: '必填', trigger: 'blur'}
      }
    }
  },
  methods: {
    handle () {
      this.$refs.codeForm.validate((valid) => {
        if (valid) {
          generator(this.codeForm).then(data => {
            if (data.result) {
              this.$refs.codeForm.resetFields()
              this.$Message.success('代码生成指令发送成功, 请检查代码')
            } else {
              this.$Message.success('代码生成失败,请检查配置信息')
            }
          })
        }
      })
    }
  }
}
</script>
