import request from '@/utils/request'

/**
 * 退出群组
 * @param groupId 群组id
 * @param userId 退出人id
 */
export const outGroup = (groupId, userId) => {
  return request({
    url: '/ms/chat/group/member/out',
    method: 'get',
    params: {
      groupId: groupId,
      userId: userId
    }
  })
}

/**
 * 群组成员信息
 * @param groupId
 */
export const deptUserList = (groupId) => {
  return request({
    url: '/ms/chat/group/member/deptUserList/' + groupId,
    method: 'get'
  })
}
