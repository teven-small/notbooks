import React, { Component } from 'react';
import { connect } from 'react-redux'
import BlogItem from './BlogItem'
import { fetchBlogList } from '../../actions/blog'

class BlogList extends Component {

   componentDidMount() {
      this.props.fetchBlogList()
   }

   //这里需要对传入的数据检测 prop-types
   render() {
      const { blogList, isLoading, errMsg } = this.props
      const hasErr = Boolean(errMsg)
      return (
         isLoading
            ?
            <div>loading...</div>
            :
            hasErr
               ?
               <div>{errMsg}</div>
               :
               <ul>
                  {
                     blogList.map(blog => {
                        return (
                           <BlogItem key={blog.id} {...blog} />
                        )
                     })
                  }
               </ul>
      );
   }
}

const mapState = state => ({
   blogList: state.blog.list,
   isLoading: state.blog.isLoading,
   errMsg: state.blog.errMsg
})

export default connect(mapState, { fetchBlogList })(BlogList)