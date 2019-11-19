import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HArea from '../view/city/hArea'
import SArea from '../view/city/sArea'
import NotFound from '../view/404'

export default class CityRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/city/hArea" component={HArea}></Route>
                <Route exact path="/city/sArea" component={SArea}></Route>
                <Route exact component={NotFound}></Route>
            </Switch>
        )
    }
}