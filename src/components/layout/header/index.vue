<template>
  <Header>
    <div class="cheader-images" style="float: left">
      <img src="../../../assets/images/layout/danghui.png">
      <img src="../../../assets/images/layout/guohui.png">
    </div>
    <div class="cheader-info">
      <span>欢迎登录JMonkey管理系统2.0版本</span>
    </div>
    <div class="cheader-user">
      <Row class="photo">
        <Avatar shape="square" icon="ios-person" size="default" />
      </Row>
      <Row class="menu">
        <Dropdown>
          <a href="javascript:void(0)">
            超级管理员
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem><Icon type="md-person" /> 个人信息</DropdownItem>
            <DropdownItem><Icon type="ios-lock-outline"></Icon> 修改密码</DropdownItem>
            <DropdownItem divided style="color: #ed4014"><Icon type="md-power" /> 安全退出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Row>
    </div>
    <div class="cheader-system">
      <a href="#">
        <Row class="cheader-system-title">
          <Icon type="ios-baseball" size="30" />
        </Row>
        <Row class="cheader-system-content">
          <span>足球系统</span>
        </Row>
      </a>
    </div>
    <div class="cheader-system-current">
      <a href="#">
        <Row class="cheader-system-title">
          <Icon type="md-beer" size="30"/>
        </Row>
        <Row class="cheader-system-content">
          <span>当前系统</span>
        </Row>
      </a>
    </div>
    <div class="cheader-system">
      <a href="#">
        <Row class="cheader-system-title">
          <Icon type="ios-body" size="30"/>
        </Row>
        <Row class="cheader-system-content">
          <span>人员系统</span>
        </Row>
      </a>
    </div>
    <div class="cheader-back">
      <a href="#">
        <Row class="cheader-back-title">
          <Icon type="ios-undo" size="40" color="#2b85e4"/>
        </Row>
        <Row class="cheader-back-content">
          <span>返回上级</span>
        </Row>
      </a>
    </div>
  </Header>
</template>
<script>
export default {
  name: 'CHeader',
  data: function () {
    return {
    }
  }
}
</script>
