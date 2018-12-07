<template>
  <Header>
    <div class="cheader-images" style="float: left">
      <img src="../../../assets/images/layout/danghui.png">
      <img src="../../../assets/images/layout/guohui.png">
    </div>
    <div class="cheader-info">
      <span>欢迎登录JMonkey管理系统2.0版本</span>
    </div>
    <div class="cheader-system">
      <div style="float: left">
        <Icon type="ios-undo" size="45" color="white"/>
      </div>
      <div style="float: left">
        <Menu mode="horizontal">
          <MenuItem name="1"> <Icon type="ios-paper" /> 内容管理 </MenuItem>
          <MenuItem name="2"> <Icon type="ios-people" /> 用户管理 </MenuItem>
          <MenuItem name="3"> <Icon type="ios-construct" /> 系统设置 </MenuItem>
          <MenuItem name="4"> <Icon type="ios-construct" /> 综合设置 </MenuItem>
        </Menu>
      </div>
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
            <DropdownItem><Icon type="md-person" /> 个人信息</DropdownItem>
            <DropdownItem><Icon type="ios-lock-outline"></Icon> 修改密码</DropdownItem>
            <DropdownItem divided style="color: #ed4014"><Icon type="md-power" /> 安全退出</DropdownItem>
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
