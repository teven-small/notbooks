import React, { Component, Fragment } from 'react'

import {
    TodoHeader,
    TodoInput,
    TodoList
} from './components'

export default class app extends Component {
    constructor() {
        super()
        this.state = {
            title: '待办事项列表',
            desc: "今日事，今日毕",
            article: '<div>文章标题</div>',
            todoList: [
                { id: 1, title: "吃饭", isFinish: true },
                { id: 2, title: "睡觉", isFinish: false },
            ]
        }
    }

    addTodo = (todo) => {
        // this.setState({
        //     todoList: this.state.todoList.concat({
        //         id: Math.random(),
        //         title: todo,
        //         isFinish: false
        //     })
        // })

        // const newList = this.state.todoList.slice()
        const newList = [...this.state.todoList]
        newList.push({
            id: Math.random(),
            title: todo,
            isFinish: false
        })
        this.setState({
            todoList: newList
        })
    }

    changeIsFinish = (id) => {
        // console.log(id)
        this.setState((prevState) => {
            return {
                todoList: prevState.todoList.map(todo => {
                    if (todo.id === id) {
                        todo.isFinish = !todo.isFinish
                    }
                    return todo
                })
            }
        })
    }

    render() {
        return (
            <Fragment>
                <TodoHeader desc={this.state.desc}>
                    <i>{this.state.title}</i>
                </TodoHeader>
                <TodoInput addTodo={this.addTodo} />
                <TodoList
                    todos={this.state.todoList}
                    changeIsFinish={this.changeIsFinish}
                ></TodoList>
                <div dangerouslySetInnerHTML={{ __html: this.state.article }} />
            </Fragment >
        )
    }
}
