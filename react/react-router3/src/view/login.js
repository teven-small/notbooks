import React from 'react'
import Nav from '../view/Nav'

export default class Routers extends React.Component {
    render() {
        return (
            <div>
                <Nav />
                登录页：{this.props.params.name}:{this.props.params.pwd}
            </div>
        )
    }
}