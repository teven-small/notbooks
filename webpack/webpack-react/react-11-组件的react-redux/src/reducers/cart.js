//为了避免actionType重复，所以一般会把actionType放在一个文件了进行管理，也可衣蛾避免重复写入actionType
import actionTypes from '../actions/actionTypes'

//初始化状态
const initState = [
    {
        id: 1,
        title: 'Apple',
        price: 6999,
        number: 1
    },
    {
        id: 2,
        title: 'Orange',
        price: 8999,
        number: 1
    }
]

//创建购物车的reducer，reducer的参数1：state并且有一个初始值，2：action
export default (state = initState, action) => {
    // console.log(action)
    //根据不同的action.type，做不同的处理，每次返回一个新的state，返回的类型要一样
    switch (action.type) {
        case actionTypes.ADD_NUMBER_INCREMENT:
            return state.map(item => {
                if (item.id === action.payload.id) {
                    item.number -= 1
                }
                return item
            })
        case actionTypes.ADD_NUMBER_DECREMENT:
            return state.map(item => {
                if (item.id === action.payload.id) {
                    item.number += 2
                }
                return item
            })
        default:
            return state
    }
}