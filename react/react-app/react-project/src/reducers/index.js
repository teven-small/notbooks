import { combineReducers } from 'redux'

import noticeCenter from './noticeCenter'
import userLogin from './userLogin'

export default combineReducers({
   noticeCenter,
   userLogin
})