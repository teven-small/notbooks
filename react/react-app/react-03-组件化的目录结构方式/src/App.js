import React, { Component } from 'react';

import {
   TodoHead,
   TodoInput,
   TodoList,
   Loves
} from './components'

class App extends Component {
   constructor() {
      super()
      this.state = {
         desc: "今日事，今日毕",
         title: "待办处理实践",
         tags: "<p>当字符串string含有标签时，用dangerouslySetInnerHTML</p>",
         todos: [
            { id: 1, title: '吃饭', isCompleted: true },
            { id: 2, title: '睡觉', isCompleted: false },
         ]
      }
   }

   addToDO = (arg) => {
      //错误做法
      // this.setState({
      //    todos: this.state.todos.push({
      //       id: Math.random(),
      //       title: arg,
      //       isCompleted: true
      //    })
      // })

      this.setState({
         todos: this.state.todos.concat({
            id: Math.random(),
            title: arg,
            isCompleted: false
         })
      })
   }

   render() {
      return (
         <>
            <TodoHead desc={this.state.desc} x={2}>{this.state.title}</TodoHead>
            <TodoInput addToDo={this.addToDO} />
            <TodoList todos={this.state.todos} />
            <div dangerouslySetInnerHTML={{ __html: this.state.tags }} />
            <Loves />
         </>
      );
   }
}

export default App;