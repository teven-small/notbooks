import React, { Component } from 'react'

export default class Like extends Component {
    constructor() {
        super()
        this.state = {
            isLike: true
        }
    }

    handleLike = () => {
        // 第一种方法
        // this.setState({
        //     isLike: !this.state.isLike
        // })

        //第二种方法
        this.setState((prev) => {
            // console.log("内部state：" + prev.isLike)
            return {
                isLike: !prev.isLike
            }
        })
        // console.log("外部state：" + this.state.isLike)
    }

    render() {
        return (
            <div onClick={this.handleLike}>
                {this.state.isLike ? "取消❤️" : "喜欢🖤"}
            </div>
        )
    }
}
