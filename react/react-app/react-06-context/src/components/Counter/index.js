import React, { Component } from 'react'
import { CounterConsumer } from '../../countStore'
export default class Counter extends Component {
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
