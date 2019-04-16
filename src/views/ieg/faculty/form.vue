<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" :mask-closable="false"
         @on-visible-change="visibleChange" width="1200" class="ieg-faculty-form">
    <Form ref="facultyForm" :model="facultyForm" :rules="facultyRules" :label-width="90">
      <Row :gutter="32">
        <Col span="12">
          <FormItem label="院系名称" prop="name">
            <Input type="text" v-model.trim="facultyForm.name" :maxlength="50" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="院系网址" prop="website">
            <Input type="text" v-model.trim="facultyForm.website" :maxlength="50" clearable >
              <span slot="prepend">http://</span>
            </Input>
          </FormItem>
        </Col>
      </Row>
      <!-- <Row :gutter="32">
        <Col span="12">
          <FormItem label="联系方式" prop="phone">
            <Input type="text" v-model.trim="facultyForm.phone" :maxlength="50" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="校内排名" prop="sort">
            <InputNumber :max="10000" :min="1" v-model="facultyForm.sort" style="width: 100%"/>
          </FormItem>
        </Col>
      </Row> -->
      <Row style="height: 500px;">
        <Divider><Icon type="ios-information-circle-outline" size="16"/> 院系详细信息 </Divider>
        <CEditor v-model="facultyForm.describe" imgRef="faculty-handle"
                 imgAction="/ieg/school/faculty/file" :imgData="{schoolId: schoolId}"/>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import CEditor from '@/components/layout/editor'
import { save, modify } from '@/api/ieg/faculty'

export default {
  name: 'IegFaculty_Form',
  components: {
    CEditor
  },
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    schoolId: {type: String, default: '', required: true},
    faculty: {type: Object, default: null, required: false}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑院系信息',
        'raise': '新增院系信息'
      }
      return titleAry[this.type]
    }
  },
  data () {
    return {
      loading: true,
      isShow: false,
      facultyForm: {
        name: null,
        website: null,
        phone: null,
        sort: 1,
        describe: ''
      },
      facultyRules: {
        name: { required: true, message: '请输入院系名称', trigger: 'blur' }
      }
    }
  },
  methods: {
    /**
     * ok handle
     */
    ok () {
      this.$refs.facultyForm.validate((valid) => {
        if (valid) {
          this.facultyForm.schoolId = this.schoolId
          this[this.type]()
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    /**
     * raise faculty
     */
    raise () {
      save(this.facultyForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    /**
     * modify faculty
     */
    modify () {
      modify(this.facultyForm).then(data => {
        if (data.isSuccess) this.callBack('修改成功')
      })
    },
    /**
     * 操作成功
     * @param msg
     */
    callBack (msg) {
      this.$Message.success(msg)
      this.cancel()

      this.$emit('refresh', '')
    },
    /**
     * close modal
     */
    cancel () {
      this.$refs.facultyForm.resetFields()

      this.facultyForm = {
        name: null,
        website: null,
        phone: null,
        sort: 1,
        describe: ''
      }

      this.isShow = false
    },
    /**
     * open modal
     * @param isOpen true
     */
    visibleChange (isOpen) {
      if (isOpen && this.type === 'modify') this.facultyForm = Object.assign({}, this.faculty)
    }
  }
}
</script>
