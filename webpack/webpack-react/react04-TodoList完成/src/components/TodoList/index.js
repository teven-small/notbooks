import React, { Component } from 'react'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'

export default class TodoList extends Component {
    static propTypes = {
        todos: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            isFinish: PropTypes.bool.isRequired
        })).isRequired,
        changeFinish: PropTypes.func
    }
    render() {
        // console.log(this.props)
        return (
            <ul>
                {
                    this.props.todos.map(todo => {
                        return (
                            <TodoItem
                                // key={todo.id}
                                // id={todo.id}
                                // title={todo.title}
                                // isFinish={todo.isFinish}
                                key={todo.id}
                                {...todo}
                            // changeFinish={this.props.changeIsFinish}
                            />
                        )
                    })
                }
            </ul>
        )
    }
}
