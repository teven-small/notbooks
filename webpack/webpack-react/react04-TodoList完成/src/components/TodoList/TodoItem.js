import React, { Component } from 'react'
const noop = () => { }
export default class TodoItem extends Component {
    changeFinish = () => {
        const {
            changeFinish = noop,
            id
        } = this.props

        changeFinish && changeFinish(id)
    }

    render() {
        console.log("TodoItem Render")
        return (
            <li>
                <input
                    type="checkbox"
                    checked={this.props.isFinish}
                    onChange={this.changeFinish}
                />
                <span>{this.props.title}  {this.props.isFinish ? "完成" : "未完成"}</span>
            </li>
        )
    }
}
