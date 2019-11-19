import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import App from '../view/app'
import SubRouter from './subRouter'

export default class Home extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <App>
                    <Route path="/" component={SubRouter}></Route>
                </App>
            </BrowserRouter>
        )
    }
}