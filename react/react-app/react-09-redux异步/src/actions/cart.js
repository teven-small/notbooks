
import actionTypes from './actionType'

export const increment = (id) => {
   return {
      type: actionTypes.CART_AMOUNT_INCREMENT,
      payload: {
         id
      }
   }
}

export const decrement = (id) => {
   return {
      type: actionTypes.CART_AMOUNT_DECREMENT,
      payload: {
         id
      }
   }
}

//异步action，使用redux-thunk之后，就可以再actionCreator里return一个方法，参数就是dispatch
// export const decrementAsync = (id) => {
//    return (dispatch) => {
//       setTimeout(() => {
//          dispatch(decrement(id))
//       }, 2000);
//    }
// }
export const decrementAsync = (id) => dispatch => {
   setTimeout(() => {
      dispatch(decrement(id))
   }, 2000);
}