//在实际项目中，由于只有单一的store。但是状态会有很多分类，所以我们需要划分reducer，
//createStore的参数又只有一个reducer，所以，redux比较聪明的提供了一个用于合并多个
//reducer的方法。注意：不用手动合并
import { combineReducers } from 'redux'

//引入cart  reducer，如果多个，继续引入
import cart from './cart';

//导出combineReducers合并之后的reducer
export default combineReducers({
    //多个reducer作为combineReducers对象的参数传入， 在外就可以通过
    //store.getState().cart来获取cartReducer里面的state
    cart
})
