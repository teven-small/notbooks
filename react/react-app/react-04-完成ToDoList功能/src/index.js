import React from 'react'
import { render } from 'react-dom'

import App from './App'

//如果全局扩展React.Component的prototype，如ajax，就可以像下这样做
// import * as service from './services'
//挂载http，可以通过this.http来获取
// React.Component.prototype.http = service

render(
   <App title="React 18.6 !" />,
   document.getElementById("root")
)