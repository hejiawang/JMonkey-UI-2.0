const getters = {
  website: state => state.common.website,
  windowHeight: state => state.common.windowHeight,
  currentMenu: state => state.common.currentMenu,
  access_token: state => state.user.access_token,
  user: state => state.user.user,
  roleList: state => state.user.roleList,
  deptList: state => state.user.deptList,
  permissions: state => state.user.permissions,
  isGuide: state => state.user.isGuide
}

export default getters
