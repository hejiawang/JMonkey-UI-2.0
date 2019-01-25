import request from '@/utils/request'

/**
 * list
 */
export const list = () => {
  return request({
    url: '/sys/task/list',
    method: 'get'
  })
}

/**
 * save
 * @param obj obj
 */
export const save = (obj) => {
  return request({
    url: '/sys/task/save',
    method: 'post',
    data: obj
  })
}

/**
 * modify
 * @param obj obj
 */
export const modify = (obj) => {
  return request({
    url: '/sys/task/modify',
    method: 'put',
    data: obj
  })
}

/**
 * delete
 * @param obj obj
 */
export const del = (obj) => {
  return request({
    url: '/sys/task/delete',
    method: 'post',
    data: obj
  })
}

/**
 * find
 * @param id id
 */
export const find = (id) => {
  return request({
    url: '/sys/task/find/' + id,
    method: 'get'
  })
}

/**
 * 校验任务名称是否存在
 * @param className
 */
export const checkTask = (className) => {
  return request({
    url: '/sys/task/checkTask',
    method: 'get',
    params: {
      className: className
    }
  })
}

/**
 * 验证定时任务规则表达式
 * @param rule
 */
export const checkRule = (rule) => {
  return request({
    url: '/sys/task/checkRule',
    method: 'get',
    params: {
      rule: rule
    }
  })
}

/**
 * 校验任务名是否重复
 * @param obj
 */
export const checkName = (id, name) => {
  return request({
    url: '/sys/task/checkName',
    method: 'post',
    data: {
      id: id,
      name: name
    }
  })
}

/**
 * 暂停任务
 * @param obj
 */
export const pause = (obj) => {
  return request({
    url: '/sys/task/pause',
    method: 'post',
    data: obj
  })
}

/**
 * 恢复任务
 * @param obj
 */
export const resume = (obj) => {
  return request({
    url: '/sys/task/resume',
    method: 'post',
    data: obj
  })
}

/**
 * 立即执行一次任务
 * @param obj obj
 */
export const startNow = (obj) => {
  return request({
    url: '/sys/task/startNow',
    method: 'post',
    data: obj
  })
}
