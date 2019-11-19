import actionTypes from './actionTypes'
import { getNoticeList } from '../https'

const startMarkAsRead = () => {
   return {
      type: actionTypes.START_NOTICE_FETCH
   }
}
const finishMarkAsRead = () => {
   return {
      type: actionTypes.FINISH_NOTICE_FETCH
   }
}

export const noticeCenterChangeHasread = (id) => {
   return dispatch => {
      dispatch(startMarkAsRead())
      setTimeout(() => {
         dispatch({
            type: actionTypes.NOTICECENTER_CHANGE_HASREAD,
            payload: {
               id
            }
         })
         dispatch(finishMarkAsRead())
      }, 2000);
   }
}

export const allHasreadChange = () => {
   return dispatch => {
      dispatch(startMarkAsRead())
      setTimeout(() => {
         dispatch({
            type: actionTypes.ALL_HASREAD_CHANGE
         })
         dispatch(finishMarkAsRead())
      }, 2000);
   }
}

export const getNoticeListData = () => {
   return dispatch => {
      dispatch(startMarkAsRead())
      getNoticeList()
         .then(res => {
            dispatch({
               type: actionTypes.SAVE_NOTICE,
               payload: {
                  list: res.list
               }
            })
         })
         .finally(() => {
            dispatch(finishMarkAsRead())
         })
   }
}