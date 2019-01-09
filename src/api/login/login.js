import request from '@/utils/request'

/**
 * 用户登陆
 * @param username 登陆名称
 * @param password 登陆密码
 * @param code 验证码
 * @param randomStr 验证码key
 */
export const loginByUsername = (username, password, code, randomStr) => {
  let grant_type = 'password', scope = 'server', client_id = 'JMonkey_client_id', client_secret = 'JMonkey_client_secret' // eslint-disable-line
  return request({
    url: '/oauth/token',
    method: 'post',
    params: { username, password, randomStr, code, grant_type, scope, client_id, client_secret }
  })
}
