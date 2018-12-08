<template>
  <Layout v-layoutIn class="guide">
    <CHeader :system="false" />
    <Layout class="content">
      <Row :gutter="120">
        <Col span="8" class="content-col">
          <Card>
            <div class="content-left">
              <div class="content-sys">
                <a href="#"><span> 系统设置 </span></a>
              </div>
            </div>
            <div class="content-right">
              <div class="content-menu">
                <Row :gutter="40">
                  <Col span="12">
                    <a>
                      <div class="content-menu-detail">
                        <Row><Icon type="ios-apps-outline" size="50" color="white"/></Row>
                        <Row><span>用户管理</span></Row>
                      </div>
                    </a>
                  </Col>
                  <Col span="12">
                    <a>
                      <div class="content-menu-detail">
                        <Row><Icon type="ios-brush-outline" size="50" color="white"/></Row>
                        <Row><span>角色管理</span></Row>
                      </div>
                    </a>
                  </Col>
                  <Col span="12">
                    <a>
                      <div class="content-menu-detail">
                        <Row><Icon type="ios-basketball-outline" size="50" color="white"/></Row>
                        <Row><span>部门管理</span></Row>
                      </div>
                    </a>
                  </Col>
                </Row>
              </div>
            </div>
          </Card>
        </Col>

        <Col span="8" class="content-col">
          <Card>
            <div class="content-only">
              <a href="#">
                <Row><Icon type="ios-barcode-outline" size="100" color="white"/></Row>
                <Row><span>系统设置</span></Row>
              </a>
            </div>
          </Card>
        </Col>

      </Row>
    </Layout>
  </Layout>
</template>
<script>
import CHeader from '@/components/layout/header'

export default {
  name: 'LayoutGuide',
  components: {
    CHeader
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss">
  @import '../../assets/css/guide.scss';
</style>
