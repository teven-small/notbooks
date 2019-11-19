import actionTypes from './actionTypes'
import { getPosts } from '../services'

const startFetchBlogList = () => {
   return {
      type: actionTypes.START_BLOG_LIST_FETCH
   }
}

const fetchSuccessBlogList = (payload) => {
   return {
      type: actionTypes.FETCH_SUCCESS_BLOG_LIST,
      payload
   }
}

const detchFailedBlogList = () => {
   return {
      type: actionTypes.FETCH_FAILED_BLOG_LIST
   }
}

export const fetchBlogList = () => dispatch => {
   dispatch(startFetchBlogList())
   getPosts()
      .then(res => {
         if (res.status === 200) {
            dispatch(fetchSuccessBlogList({
               list: res.data
            }))
         } else {
            dispatch(detchFailedBlogList())
         }
      })
      .catch(err => {
         dispatch(detchFailedBlogList())
      })
}