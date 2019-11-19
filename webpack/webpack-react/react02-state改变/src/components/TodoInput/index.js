import React, { Component } from 'react'
import PropsTypes from 'prop-types'
export default class index extends Component {
    static propsTypes = {
        btnText: PropsTypes.string.isRequired
    }
    static defaultProps = {
        btnText: "添加"
    }
    constructor() {
        super()
        this.state = {
            inputVal: ''
        }
    }


    inputChange = (e) => {
        // console.log(e.currentTarget.value)
        this.setState({
            inputVal: e.currentTarget.value
        })
    }

    clickAdd = () => {
        this.props.addTodo(this.state.inputVal)
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.inputVal}
                    onChange={this.inputChange}
                />
                <button onClick={this.clickAdd}>{this.props.btnText}</button>
            </div>
        )
    }
}
