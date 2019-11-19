import React, { Component } from 'react'
import { Route, NavLink as Link, Redirect, Switch } from 'react-router-dom'
import {
    Home,
    Articl,
    Users,
    ArticlDetail,
    NotFound
} from './views'

export default class App extends Component {
    state = {
        isLogin: false
    }
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/home">首页</Link></li>
                    <li><Link to="/articl">文章页</Link></li>
                    <li><Link to="/users">用户页</Link></li>
                </ul>
                <Switch>
                    <Route component={Home} path="/home" />
                    <Route component={Articl} path="/articl" exact />
                    <Route component={ArticlDetail} path="/articl/:id" />
                    <Route path="/users" render={(routeProps) => {
                        return this.state.isLogin
                            ?
                            <Users {...routeProps} />
                            :
                            <div>请登录</div>
                    }} />
                    <Route component={NotFound} path="/404" />
                    <Redirect to="/home" from="/" exact />
                    <Redirect to="/404" />
                </Switch>
            </div>
        )
    }
}
