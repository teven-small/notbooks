//createContext 是react提供垮组件传值的方法
//1. 引入createContext
import React, { Component, createContext } from 'react'
import { render } from 'react-dom'

//createContext这个方法的结果是一个对象，里面有Provider，Consumer
//Provider用于提供状态
//Consumer用于接受状态
//2. 结构createContext这个方法的结果
const {
   Provider,
   Consumer: CounterConsumer
} = createContext()

//封装一个基本的Provider，直接用Provider不方便管理状态
//3. 封装一个CounterProvider
class CounterProvider extends Component {
   constructor() {
      super()
      //共享的state，任何被这个CounterProvider包裹的后台组件，可以通过CounterConsumer来接受这个state
      this.state = {
         count: 100
      }
   }
   incrementCount = () => {
      this.setState({
         count: this.state.count + 1
      })
   }
   decrementCount = () => {
      this.setState({
         count: this.state.count - 1
      })
   }
   render() {
      return (
         <Provider
            value={{
               count: this.state.count,
               incrementCount: this.incrementCount,
               decrementCount: this.decrementCount,
            }}>
            {this.props.children}
         </Provider>
      )
   }
}

class Count extends Component {
   render() {
      return (
         // 5. 用CounterConsumer来接受共享的state
         <CounterConsumer>
            {
               //6.注意！CounterConsumer的Children必须是一个方法，这个方法有一个参数，这个参数就是Provider的value值
               ({ count }) => {
                  return <span>{count}</span>
               }
            }
         </CounterConsumer>
      )
   }
}

class CountBtn extends Component {
   render() {
      return (
         // 5. 用CounterConsumer来接受共享的state
         <CounterConsumer>
            {
               //6.注意！CounterConsumer的Children必须是一个方法，这个方法有一个参数，这个参数就是Provider的value值
               ({ incrementCount, decrementCount }) => {
                  const handler = this.props.type === 'increment' ? incrementCount : decrementCount
                  return <button onClick={handler}>{this.props.children}</button>
               }
            }
         </CounterConsumer>
      )
   }
}

class App extends Component {
   render() {
      return (
         <>
            <CountBtn type="decrement" >-</CountBtn>
            <Count />
            <CountBtn type="increment" >+</CountBtn>
         </>
      )
   }
}

render(
   // 4. 用CounterProvider包裹共享state
   <CounterProvider>
      <App />
   </CounterProvider>,
   document.querySelector("#root")
)