import React from 'react'
import { Link } from 'react-router-dom'
export default class City extends React.Component {
    render() {
        return (
            <div>
                城市
                <ul>
                    <li><Link to="/city/hArea">红山区</Link></li>
                    <li><Link to="/city/sArea">松山区</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}