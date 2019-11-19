import React, { Component } from 'react';
import { Route, NavLink as Link, Redirect, Switch } from 'react-router-dom'
import {
   Artical,
   ArticalDetail,
   Home,
   User,
   NotFound
} from './views'

class App extends Component {
   render() {
      return (
         <div>
            <ul>
               <li><Link to="/home">首页</Link></li>
               <li><Link to="/artical">文章</Link></li>
               <li><Link to="/user">用户</Link></li>
            </ul>
            <Switch>
               <Route render={(routerProps) => {
                  return <Home {...routerProps} x={2} />
               }} path="/home" />
               <Route component={User} path="/user" />
               <Route component={Artical} path="/artical" exact />
               <Route component={ArticalDetail} path="/artical/:id" />
               <Route component={NotFound} path="/404" />
               <Redirect to="/home" from="/" exact />
               <Redirect to="/404" />
            </Switch>
         </div>
      );
   }
}

export default App;