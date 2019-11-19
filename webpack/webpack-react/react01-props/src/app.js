import React, { Component, Fragment } from 'react'

import {
    TodoHeader,
    TodoInput,
    TodoList
} from './components'

export default class app extends Component {
    render() {
        return (
            <Fragment>
                <TodoHeader desc="今日事，今日毕">
                    <i>待办事项列表</i>
                </TodoHeader>
                <TodoInput />
                <TodoList />
            </Fragment>
        )
    }
}
