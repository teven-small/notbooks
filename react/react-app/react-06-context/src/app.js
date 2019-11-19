import React, { Component } from 'react'

import {
   CountBtn,
   Counter
} from './components'

class App extends Component {
   render() {
      return (
         <>
            <CountBtn type="decrement" >-</CountBtn>
            <Counter />
            <CountBtn type="increment" >+</CountBtn>
         </>
      )
   }
}

export default App