import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../view/home/index'
import City from '../view/city/index'
import Detail from '../view/detail/index'
import NotFound from '../view/404/index'
import CityRouter from './cityRoouter'

export default class SubRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <City path="/city" >
                    <Route path="/" component={CityRouter}></Route>
                </City>
                <Route exact path="/detail" component={Detail}></Route>
                <Route exact component={NotFound}></Route>
            </Switch>
        )
    }
}