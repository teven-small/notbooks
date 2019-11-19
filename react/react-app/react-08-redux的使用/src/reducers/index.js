//createStore只能接受一个store，但是状态会有很多分类，所有我们需要划分reducer.createStore
//的参数有只能接收一个reducer，所有，redux提供了一个苯丙多个reducer的方法，注意：不需要手动合并
import { combineReducers } from 'redux'

// 引入对个reducer
import cart from './cart'

//导出合并reducer
export default combineReducers({
   //把多个reducer作为combineReducers对象传入，在store.getState().cart来获取到cartReducer
   //里面的state
   cart
})