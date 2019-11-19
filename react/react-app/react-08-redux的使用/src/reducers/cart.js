//为了避免actionType重复，所以一般会把actionType放在一个文件里同意进行管理
import actionType from '../actions/actionType'

//初始化状态
const initState = [
   {
      id: 1,
      title: 'Apple',
      price: 6669,
      amount: 12
   },
   {
      id: 2,
      title: '三星',
      price: 3469,
      amount: 14
   },
   {
      id: 3,
      title: '华为',
      price: 2369,
      amount: 17
   }
]

//创建reducer，reducer的固定写法是两个参数，第一个state并有一个初始值，第二个action
export default (state = initState, action) => {
   //根据不同的axtion.type，做不同的处理，每次返回一个新的state，返回的类型要一样
   switch (action.type) {
      case actionType.CART_AMOUNT_INCREMENT:
         return state.map(item => {
            if (item.id === action.payload.id) {
               item.amount += 1
            }
            return item
         })
      case actionType.CART_AMOUNT_DECREMENT:
         return state.map(item => {
            if (item.id === action.payload.id) {
               item.amount -= 1
            }
            return item
         })
      default:
         return state
   }
}