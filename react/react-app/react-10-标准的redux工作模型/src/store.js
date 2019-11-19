//创建store
import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

//引入合并后的reducer
import rootReducer from './reducers'

//createStore的第一个参数必须是reduce，如果是多个请在reducers目录下先使用
//combineReducers合并之后再导出
export default createStore(
   rootReducer,
   applyMiddleware(thunk)
)