import React, { Component } from 'react';

import {
   TodoHead,
   TodoInput,
   TodoList,
   Loves
} from './components'

import { getTodos } from './services'

class App extends Component {
   constructor() {
      super()
      this.state = {
         desc: "今日事，今日毕",
         title: "待办处理实践",
         tags: "<p>当字符串string含有标签时，用dangerouslySetInnerHTML</p>",
         todos: [
            { id: 1, title: '吃饭', completed: true },
            { id: 2, title: '睡觉', completed: false },
         ],
         isLoading: true
      }
   }

   // componentDidMount() {
   //    console.log(this.http.getTodos)
   // }

   getData = () => {
      getTodos()
         .then(res => {
            console.log(res)
            if (res.status === 200) {
               this.setState({
                  todos: res.data
               })
            }
            else {

            }
         })
         .catch(err => {
            console.log(err)
         })
         .finally(() => {
            this.setState({
               isLoading: false
            })
         })
   }

   componentDidMount() {
      this.getData()
   }

   addToDO = (arg) => {
      //错误做法
      // this.setState({
      //    todos: this.state.todos.push({
      //       id: Math.random(),
      //       title: arg,
      //       completed: true
      //    })
      // })

      // this.setState({
      //    todos: this.state.todos.concat({
      //       id: Math.random(),
      //       title: arg,
      //       completed: false
      //    })
      // })

      const newArr = { ...this.state.todos }

      newArr.push({
         id: Math.random(),
         title: arg,
         completed: true
      })

      this.setState({
         todos: newArr
      })
   }

   onChangeIsCompleted = (id) => {
      this.setState((prevState) => {
         return {
            todos: prevState.todos.map(todo => {
               if (todo.id === id) {
                  todo.completed = !todo.completed
               }
               return todo
            })
         }
      })
   }

   render() {
      return (
         <>
            <TodoHead
               desc={this.state.desc}
               x={2}>{this.state.title}</TodoHead>
            <TodoInput
               addToDo={this.addToDO} />
            {
               this.state.isLoading
                  ?
                  <div>加载中...</div>
                  :
                  <TodoList
                     todos={this.state.todos}
                     onChangeIsCompleted={this.onChangeIsCompleted} />
            }
            <div dangerouslySetInnerHTML={{ __html: this.state.tags }} />
            <Loves />
         </>
      );
   }
}

export default App;