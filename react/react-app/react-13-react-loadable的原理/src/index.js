import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import App from './App'

import { mainRouter } from './routers'

render(
   <Router>
      <Switch>
         <Route path="/admin" render={(routerProps) => {
            //设置权限，需要登录才能访问/admin
            return <App {...routerProps} />
         }} />
         {
            mainRouter.map(route => {
               return <Route key={route.pathname} path={route.pathname} component={route.component} />
            })
         }
         <Redirect to="/admin" from="/" exact />
         <Redirect to="/404" />
      </Switch>
   </Router>,
   document.querySelector("#root")
)