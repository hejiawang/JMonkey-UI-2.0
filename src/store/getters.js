const getters = {
  website: state => state.common.website,
  windowHeight: state => state.common.windowHeight,
  currentMenu: state => state.common.currentMenu,
  access_token: state => state.user.access_token
}

export default getters
