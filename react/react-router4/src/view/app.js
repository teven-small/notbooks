import React from 'react'
import { Link } from 'react-router-dom'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/city">城市</Link></li>
                    <li><Link to="/detail">详情页</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}