import React from 'react'
import { render } from 'react-dom'

import App from './app'
import { CounterProvider } from './countStore'

render(
   // 4. 用CounterProvider包裹共享state
   <CounterProvider>
      <App />
   </CounterProvider>,
   document.querySelector("#root")
)