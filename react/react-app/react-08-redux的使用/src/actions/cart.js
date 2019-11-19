
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