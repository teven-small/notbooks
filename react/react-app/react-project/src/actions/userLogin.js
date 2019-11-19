import actionTypes from './actionTypes'
import { usersLogin } from '../https'

const startLogin = () => {
   return {
      type: actionTypes.START_LOGIN
   }
}
const loginSuccess = (userInfo) => {
   return {
      type: actionTypes.LOGIN_SUCCESS,
      payload: {
         userInfo
      }
   }
}
const loginFailed = () => {
   window.localStorage.removeItem('token')
   window.localStorage.removeItem('userInfo')
   window.sessionStorage.removeItem('token')
   window.sessionStorage.removeItem('userInfo')
   return {
      type: actionTypes.LOGIN_FAILED
   }
}

export const logout = () => {
   return dispatch => {
      dispatch(loginFailed())
   }
}

export const login = (userInfo) => {
   return dispatch => {
      dispatch(startLogin())
      usersLogin(userInfo)
         .then(res => {
            if (res.status === 200) {
               const data = res.data.data
               const userInfos = {
                  id: data.id,
                  avatar: data.avatar,
                  name: data.name,
                  role: data.role,
               }
               if (userInfo.remember === true) {
                  window.localStorage.setItem('token', data.token)
                  window.localStorage.setItem('userInfo', JSON.stringify(userInfos))
               } else {
                  window.sessionStorage.setItem('token', data.token)
                  window.sessionStorage.setItem('userInfo', JSON.stringify(userInfos))
               }

               dispatch(loginSuccess(data))
            } else {
               dispatch(loginFailed(userInfo))
            }
         })
   }
}