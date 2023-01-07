import request from './request'

export const getLoginData = (loginForm) => request({
  url: '/login',
  method: 'POST',
  data: loginForm
})
