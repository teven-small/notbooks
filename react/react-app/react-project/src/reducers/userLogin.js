import actionTypes from '../actions/actionTypes'

const isLogin = Boolean(window.localStorage.getItem('token')) || Boolean(window.sessionStorage.getItem('token'))
const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || JSON.parse(window.sessionStorage.getItem('userInfo'))

const initState = {
   ...userInfo,
   isLogin,
   isLogining: false,
}

export default (state = initState, action) => {
   switch (action.type) {
      case actionTypes.START_LOGIN:
         return {
            ...state,
            isLogining: true
         }
      case actionTypes.LOGIN_SUCCESS:
         return {
            ...state,
            ...action.payload.userInfo,
            isLogin: true,
            isLogining: false
         }
      case actionTypes.LOGIN_FAILED:
         return {
            id: '',
            avatar: '',
            name: '',
            role: '',
            isLogin: false
         }
      default:
         return state
   }
}