import React, { Component, Fragment } from 'react'

import {
    TodoHeader,
    TodoInput,
    TodoList,
    Like
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

    addTodo = (arg) => {
        // this.setState({
        //     todoList: this.state.todoList.concat({
        //         id: Math.random(),
        //         title: arg,
        //         isFinish: false
        //     })
        // })
        // const newTodos = this.state.todoList.slice()
        const newTodos = [...this.state.todoList]
        newTodos.push({
            id: Math.random(),
            title: arg,
            isFinish: false
        })
        this.setState({
            todoList: newTodos
        })
    }

    render() {
        return (
            <Fragment>
                <TodoHeader desc={this.state.desc}>
                    <i>{this.state.title}</i>
                </TodoHeader>
                <TodoInput
                    addTodo={this.addTodo}
                />
                <TodoList todos={this.state.todoList}></TodoList>
                <div dangerouslySetInnerHTML={{ __html: this.state.article }} />
                <Like />
            </Fragment >
        )
    }
}
