import React from 'react'
import { Link } from 'react-router'

export default class Nav extends React.Component {
    render() {
        var name = '张三', pwd = '123213'
        return (
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to={`/login/${name}/${pwd}`}>登录页</Link></li>
                <li><Link to="/details">详情页</Link></li>
            </ul>
        )
    }
}