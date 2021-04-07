
  import { axios }  from '../../utils/request'
const api = {
  login:'/user/login'
}
export function login (data){
  return axios({
    url:api.login,
    method:'post',
    data
  })
}
export function logout (data){
  return axios({
    url:api.login,
    method:'post',
    data
  })
}