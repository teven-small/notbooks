import React, { Component, createRef } from 'react'
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
        this.inputDom = createRef()
    }
    valueChange = (e) => {
        this.setState({
            inputVal: e.currentTarget.value
        })
    }
    addClick = () => {

        if (this.state.inputVal === '') {
            return
        }

        this.props.addTodo(this.state.inputVal)
        this.setState({ inputVal: '' })
    }

    hangleKeyUp = (e) => {
        if (this.state.inputVal === '') {
            return
        }
        if (e.keyCode === 13) {
            this.props.addTodo(this.state.inputVal)
            this.setState({ inputVal: '' })
        }
    }

    render() {
        return (
            <div>
                <input type="text"
                    value={this.state.inputVal}
                    onChange={this.valueChange}
                    onKeyUp={this.hangleKeyUp}
                    ref={this.inputDom}
                />
                <button onClick={this.addClick}>{this.props.btnText}</button>
            </div>
        )
    }
}
