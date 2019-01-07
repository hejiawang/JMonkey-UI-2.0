import request from '@/utils/request'

/**
 * 用户登陆
 * @param username 登陆名称
 * @param password 登陆密码
 * @param code 验证码
 * @param randomStr 验证码key
 */
export const loginByUsername = (username, password, code, randomStr) => {
  return request({
    url: '/oauth/token',
    headers: { 'Authorization': 'Basic cGlnOnBpZw==' },
    method: 'post',
    params: {
      username: username,
      password: password,
      randomStr: randomStr,
      code: code,
      grant_type: 'password',
      scope: 'server',
      client_id: 'JMonkey_client_id',
      client_secret: 'JMonkey_client_secret'
    }
  })
}
