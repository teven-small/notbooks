import React, { Component } from 'react'
import PropsTypes from 'prop-types'
export default class index extends Component {
    static propsTypes = {
        btnText: PropsTypes.string.isRequired
    }
    static defaultProps = {
        btnText: "添加"
    }
    render() {
        return (
            <div>
                <input type="text" />
                <button>{this.props.btnText}</button>
            </div>
        )
    }
}
