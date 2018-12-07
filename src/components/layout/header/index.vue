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
        <Avatar shape="square" icon="ios-person" size="large" />
      </Row>
      <Row class="menu">
        <Dropdown>
          <a href="javascript:void(0)">
            超级管理员
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>个人信息</DropdownItem>
            <DropdownItem>修改密码</DropdownItem>
            <DropdownItem divided>安全退出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Row>
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
