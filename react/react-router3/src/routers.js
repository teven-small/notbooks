import React, { Component } from 'react'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import Home from './view/home'
import Login from './view/login'
import Details from './view/details'
import Video from './view/video'
import Musiz from './view/musiz'

class Routers extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Home}></Route>
                <Route path="/login/:name/:pwd" component={Login}></Route>
                <Route path="/details" component={Details}>
                    <IndexRoute component={Video}></IndexRoute>
                    <Route path="/details/musiz" component={Musiz}></Route>
                </Route>
            </Router>
        )
    }
}

export default Routers