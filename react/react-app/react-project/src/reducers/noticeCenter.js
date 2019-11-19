import actionTypes from '../actions/actionTypes'
const initState = {
   isLoading: false,
   list: []
}
export default (state = initState, action) => {
   switch (action.type) {
      case actionTypes.SAVE_NOTICE:
         return {
            ...state,
            list: action.payload.list
         }
      case actionTypes.START_NOTICE_FETCH:
         return {
            ...state,
            isLoading: true
         }
      case actionTypes.FINISH_NOTICE_FETCH:
         return {
            ...state,
            isLoading: false
         }
      case actionTypes.NOTICECENTER_CHANGE_HASREAD:
         const newList = state.list.map(item => {
            if (item.id === action.payload.id) {
               item.hasRead = true
            }
            return item
         })
         return {
            ...state,
            list: newList
         }
      case actionTypes.ALL_HASREAD_CHANGE:
         return {
            ...state,
            list: state.list.map(item => {
               item.hasRead = true
               return item
            })
         }
      default:
         return state
   }
}