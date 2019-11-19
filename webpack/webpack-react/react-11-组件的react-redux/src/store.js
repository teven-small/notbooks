//createStore是redux提供的一个用于常见store的方法
import { createStore } from 'redux'

//引入合并后的reducer
import rootReducer from './reducers'

//createStore的第一个参数必须是一个reducewe，如果是多个，请在reduces目录下使用combineReducers合并之后导出
export default createStore(rootReducer)