import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import { adminRouter } from './routers'

class App extends Component {
   render() {
      return (
         <div>
            <div>页面的公共部分</div>
            <Switch>
               {
                  adminRouter.map(route => {
                     return <Route
                        key={route.pathname}
                        path={route.pathname}
                        exact={route.exact}
                        render={(routerProps) => {
                           return <route.component {...routerProps} />
                        }} />
                  })
               }
               <Redirect to={adminRouter[0].pathname} from="/admin" exact />
               <Redirect to='/404' />
            </Switch>
         </div>
      );
   }
}

export default App;