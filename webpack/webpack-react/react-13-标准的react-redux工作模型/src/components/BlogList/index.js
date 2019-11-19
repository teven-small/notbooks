import React, { Component } from 'react'
import { connect } from 'react-redux'
import BlogItem from './BlogItem'
import { fetchBlogList } from '../../actions/blog'

//容器组件（Smart/Container Components）
class BlogList extends Component {
    componentDidMount() {
        this.props.fetchBlogList()
    }
    render() {
        const { blogList, isLoading, errMsg } = this.props
        const hasErr = Boolean(errMsg)
        return (
            isLoading
                ?
                <div>加载中...</div>
                :
                (
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
                )
        )
    }
}

const mapState = state => ({
    blogList: state.blog.list,
    isLoading: state.blog.isLoading,
    errMsg: state.blog.msg
})

export default connect(mapState, { fetchBlogList })(BlogList)