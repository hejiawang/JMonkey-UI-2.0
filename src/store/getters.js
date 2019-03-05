const getters = {
  website: state => state.common.website,
  windowHeight: state => state.common.windowHeight,
  currentMenu: state => state.common.currentMenu,
  menuList: state => state.common.menuList,
  currentSystem: state => state.common.currentSystem,
  currentSystemHome: state => state.common.currentSystemHome,
  tabList: state => state.common.tabList,

  access_token: state => state.user.access_token,
  user: state => state.user.user,
  roleList: state => state.user.roleList,
  deptList: state => state.user.deptList,
  permissions: state => state.user.permissions,
  isGuide: state => state.user.isGuide,
  systemList: state => state.user.systemList,

  showIm: state => state.chat.showIm,
  memberList: state => state.chat.memberList,
  memberC: state => state.chat.memberC,
  memberNotifyList: state => state.chat.memberNotifyList
}

export default getters
