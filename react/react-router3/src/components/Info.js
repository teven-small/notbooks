import React, { Component } from 'react'

export default class Info extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            password: ''
        }
    }

    changeName(event) {
        this.setState({ name: event.currentTarget.value })
    }

    changePassword(event) {
        this.setState({ password: event.currentTarget.value })
    }

    submiteData(event) {
        event.preventDefault()
        console.log(this.state.name, this.state.password)
    }

    render() {
        return (
            <form onSubmit={this.submiteData.bind(this)}>
                <label>姓名</label>
                <input type="text" onChange={this.changeName.bind(this)} />
                <br />
                <label>密码</label>
                <input type="text" onChange={this.changePassword.bind(this)} />
                <br />
                <button type="submit">提交</button>
            </form>
        )
    }
}