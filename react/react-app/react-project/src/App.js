import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'

import { connect } from 'react-redux'

import { Frame } from './components'
import { adminRoutes } from './routers'

const menu = adminRoutes.filter(item => item.isNav === true)

const mapState = state => {
   return {
      isLogin: state.userLogin.isLogin,
      role: state.userLogin.role
   }
}

@connect(mapState)

class App extends Component {
   render() {
      return (
         this.props.isLogin ?
            <Frame menus={menu}>
               <Switch>
                  {
                     adminRoutes.map(route => {
                        return <Route
                           key={route.pathname}
                           path={route.pathname}
                           exact={route.exact}
                           render={(routerProps) => {
                              const hasRole = route.roles.includes(this.props.role)
                              return (
                                 hasRole
                                    ?
                                    <route.component {...routerProps} />
                                    :
                                    <Redirect to="/admin/notAuth" />
                              )
                           }} />
                     })
                  }
                  <Redirect to={adminRoutes[0].pathname} from="/admin" exact />
                  <Redirect to='/404' />
               </Switch>
            </Frame>
            :
            <Redirect to='/login' />
      );
   }
}

export default App