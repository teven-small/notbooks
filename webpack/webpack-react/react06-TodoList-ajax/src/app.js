import React, { Component, Fragment } from 'react'

import {
    TodoHeader,
    TodoInput,
    TodoList
} from './components'

import { getTodos } from './servers'

export default class app extends Component {
    constructor() {
        super()
        this.state = {
            title: '待办事项列表',
            desc: "今日事，今日毕",
            article: '<div>文章标题</div>',
            todoList: [
                // { id: 1, title: "吃饭", completed: true },
                // { id: 2, title: "睡觉", completed: false },
            ],
            isLoading: false
        }
    }

    getData = () => {
        this.setState({
            isLoading: true
        })
        getTodos()
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        todoList: res.data
                    })
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

    //获取全局api接口
    componentDidMount() {
        // console.log(this.http.getTodos)
        this.getData()
    }

    addTodo = (todo) => {
        // this.setState({
        //     todoList: this.state.todoList.concat({
        //         id: Math.random(),
        //         title: todo,
        //         completed: false
        //     })
        // })

        // const newList = this.state.todoList.slice()
        const newList = [...this.state.todoList]
        newList.push({
            id: Math.random(),
            title: todo,
            completed: false
        })
        this.setState({
            todoList: newList
        })

        //先post
    }

    changecompleted = (id) => {
        // console.log(id)
        this.setState((prevState) => {
            return {
                todoList: prevState.todoList.map(todo => {
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
            <Fragment>
                <TodoHeader desc={this.state.desc}>
                    <i>{this.state.title}</i>
                </TodoHeader>
                <TodoInput addTodo={this.addTodo} />
                {
                    this.state.isLoading
                        ?
                        <div>loading</div>
                        :
                        <TodoList
                            todos={this.state.todoList}
                            changecompleted={this.changecompleted}
                        />
                }
                <div dangerouslySetInnerHTML={{ __html: this.state.article }} />
            </Fragment >
        )
    }
}
