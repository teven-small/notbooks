import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Articl extends Component {
    render() {
        return (
            <div>
                <Link to="/articl/1?from=articl">文章一</Link>
                <Link to="/articl/2">文章二</Link>
                <Link to={{
                    pathname: '/articl/3',
                    state: {
                        id: 2,
                        from: 'artical'
                    }
                }}>文章三</Link>
            </div>
        )
    }
}
