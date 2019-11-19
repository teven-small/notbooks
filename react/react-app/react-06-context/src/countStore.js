//createContext 是react提供垮组件传值的方法
//1. 引入createContext
import React, { Component, createContext } from 'react'

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
         count: 100,
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

export {
   CounterConsumer,
   CounterProvider
}