import React from 'react'
import Nav from '../view/Nav'
import { Link } from 'react-router'

export default class Routers extends React.Component {
    render() {
        return (
            <div>
                <Nav />
                详情页
                <ul>
                    <li><Link to="/details/">视频</Link></li>
                    <li><Link to="/details/musiz">音乐</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}